<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-1">
                <h2>
                    Lista
                </h2>
            </b-col>
            <b-col sm="10" class="mt-3">
                <label for="">Buscar</label>
                <b-form-input type="text" size="sm" v-model="campobusqueda" id="campobusquedalista" @keydown.enter="buscar" placeholder="Escribe un nombre para búscar"></b-form-input>
            </b-col>
            <b-col sm="2" class="mt-3">
                <b-button type="button" block variant="danger" size="sm" style="margin-top: 31px;" @click="buscar">Buscar</b-button>
            </b-col>
            <b-col sm="12" class="mt-4">
                <table class="table table-striped table-sm table-bordered" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="text-align: center;">
                                DPI
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th style="text-align: center;">
                                Cargo
                            </th>
                            <th style="text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in datos" :key="index">
                            <td style="width: 15%;">
                                {{item.dpi}}
                            </td>
                            <td style="width: 55%;">
                                {{item.nombre}}
                            </td>
                            <td style="width: 15%;text-align: center;">
                                {{item.cargo}}
                            </td>
                            <td style="width: 15%;text-align: center;">
                                <b-button type="button" variant="sm" size="info" @click="modalDetalle(item.dpi)"><i class="fas fa-info-circle"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
        

        <div class="btn_flotante" @click="modalFicha">
            <i class="fas fa-list"></i>
        </div>

        <Fichas v-if="modal" v-on:cerrar="modalFicha" />
        <Detalle v-if="detalle" :dpi="dpi" v-on:cerrar="modalDetalle" />

    </b-container>
</template>

<script>

import Fichas from './Fichas.vue'
import Detalle from './Detalle.vue'

import axios from 'axios'
import { IP, PUERTO } from '@/config/parametros'
import { minix } from '@/components/functions/alertas'

export default {
    name: 'Ingresos',
    components:{
        Fichas,
        Detalle
    },
    data() {
        return {
            campobusqueda: '',
            modal: false,
            detalle: false,
            datos: [],
            dpi: ''
        }
    },
    methods: {
        
        modalFicha(){
            this.modal = !this.modal
            
        },
        modalDetalle(dp){
            this.detalle = !this.detalle
            this.dpi = dp == undefined ? '' : dp
            this.datos = []
            document.getElementById('campobusquedalista').focus()
        },
        async buscar(){

            if (this.campobusqueda == '' || this.campobusqueda == null) {
                minix({icon: 'error', mensaje: 'Escribe algo para buscar', tiempo: 3000})
                document.getElementById('campobusquedalista').focus()
            }else{
                let b = await axios.get(`http://${IP}:${PUERTO}/api/miembros/nombre/${this.campobusqueda.toUpperCase()}`, this.$store.state.token)

                if (b.data.message) {
                    minix({icon: 'info', mensaje: b.data.message, tiempo: 3000})
                    document.getElementById('campobusquedalista').focus()
                    this.campobusqueda = ''
                    this.datos = []
                }else{
                    this.datos = b.data
                    document.getElementById('campobusquedalista').focus()
                    this.campobusqueda = ''
                }

            }

        }
    },
    mounted() {
        document.getElementById('campobusquedalista').focus()
    },
}
</script>

<style>
    .btn_flotante{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: absolute;
        bottom: 20px;
        right: 20px;
        background-color: #2C8C99;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
        transition: .3s ease-in-out;
    }
        .btn_flotante:active{
            background-color: #28464B;
        }
</style>