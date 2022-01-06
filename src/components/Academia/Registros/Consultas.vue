<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h2>
                    Consultas
                </h2>
            </b-col>
            <b-col sm="2" class="mt-3">
                <label for="">Tipo</label>
                <select class="form-control form-control-sm" required v-model="tipoEntrada">
                    <option value="">Selecciona</option>
                    <option value="diezmo">Diezmo</option>
                    <option value="ofrenda">Ofrenda</option>
                    <option value="donacion">Donación</option>
                    <option value="todo">Todo</option>
                </select>
            </b-col>
            <b-col sm="4" class="mt-3">
                <label for="">Del</label>
                <b-form-input type="date" size="sm" v-model="fecha_del" variant="sm"></b-form-input>
            </b-col>
            <b-col sm="4" class="mt-3">
                <label for="">Al</label>
                <b-form-input type="date" size="sm" v-model="fecha_al" variant="sm"></b-form-input>
            </b-col>
            <b-col sm="2" class="mt-3">
                <b-button type="button" variant="sm" style="margin-top: 31px;" @click="filtrarDatos" block size="info">Consultar</b-button>
            </b-col>
            
            <b-col sm="12" class="mt-4">
                <b-table class="table-bordered table-striped" 
                    :items="lista"
                    :fields="fields"
                    :per-page="perPage"
                    :current-page="currentPage"
                    small
                    style="font-size: 11px;"
                >

                <template v-slot:cell(cantidad) = 'cant'>
                   Q {{cant.item.cantidad.toFixed(2)}}
                </template>

                <template v-slot:cell(fecha) = 'fec'>
                   {{fec.item.fecha | formateoFecha}}
                </template>


                </b-table>

                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                ></b-pagination>


            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import {IP, PUERTO} from '@/config/parametros'
import axios from 'axios'
import moment from 'moment'
import { minix } from '@/components/functions/alertas'

export default {
    name: 'Consultas',
    computed:{
        rows(){
            this.lista.length
        }
    },
    filters:{
        formateoFecha: function(val){
            return moment(val).format('DD-MM-YYYY')
        }
    },
    data() {
        return {
            tipoEntrada: '',
            fecha_del: moment(Date.now()).format('YYYY-MM-DD'),
            fecha_al: moment(Date.now()).format('YYYY-MM-DD'),
            lista: [],
            perPage: 15,
            currentPage: 1,
            fields: [
                {
                    key: 'nombre',
                    thStyle: 'width: 30%;',
                },
                {
                    key: 'iglesia',
                    thStyle: 'width: 20%;',
                },
                {
                    key: 'tipo',
                    thStyle: 'width: 10%;',
                },
                {
                    key: 'cantidad',
                    thStyle: 'width: 10%;',
                },
                {
                    key: 'fecha',
                    thStyle: 'width: 10%;',
                },
                {
                    key: 'comentario',
                    thStyle: 'width: 20%;',
                },
            ]

        }
    },
    methods: {
        async filtrarDatos(){

            if (this.tipoEntrada == '' || this.fecha_del == '' || this.fecha_al == '') {
                minix({icon: 'error', mensaje: 'Todos los campos son necesarios', tiempo: 3000})
            }else{

                let f = {
                    tipo: this.tipoEntrada,
                    del: this.fecha_del,
                    al: this.fecha_al
                }
    
                let l = await axios.post(`http://${IP}:${PUERTO}/api/ingresos/consultaportipoentrada`, f, this.$store.state.token)
    
                if (l.status == 200) {
                    this.lista = l.data
                }else{
                    minix({icon: 'info', mensaje: l.data.message, tiempo: 3000})
                }
            }

        }
    },
}
</script>

<style>

</style>