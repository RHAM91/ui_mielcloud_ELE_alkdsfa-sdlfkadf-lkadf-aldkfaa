<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" size="sm" variant="outline-danger" @click="salir">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <label for="">Buscar por nombre</label>
                        <b-form-input type="text" size="sm" v-model="busqueda" placeholder="Escribe algo y presiona enter" autocomplete="off" id="campo_buscar_"  @keydown.enter="buscar_miembros"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-4">
                        <table class="table table-sm table-bordered" style="font-size: 12px;">
                            <thead>
                                <tr>
                                    <th style="text-align: center;">
                                        DPI
                                    </th>
                                    <th>
                                        Nombre
                                    </th>
                                    <th style="text-align: center;">
                                        ...
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in resultados" :key="index">
                                    <td style="width: 20%;text-align: center;">
                                        {{item.dpi}}
                                    </td>
                                    <td style="width: 60%;">
                                        {{item.nombre}}
                                    </td>
                                    <td style="width: 20%;text-align: center;">
                                        <b-button type="button" size="sm" variant="danger" @click="subirinfo(item)">Seleccionar</b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import {IP, PUERTO} from '../../../config/parametros'
import { minix } from '@/components/functions/alertas'

export default {
    name: 'ModalBusqueda',
    data() {
        return {
            busqueda: '',
            resultados: []
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        },
        subirinfo(item){
            //console.log(item)
            this.$emit('upinfo', item)
        },
        async buscar_miembros(){

            if (this.busqueda == '' || this.busqueda == null) {
                minix({icon: 'error', mensaje: 'El campo no puede estar vacío', tiempo: 3000})
                document.getElementById('campo_buscar_').focus()
            }else{

                let datos = await axios.get(`http://${IP}:${PUERTO}/api/miembros/nombre/${this.busqueda.toUpperCase()}`, this.$store.state.token)

                if (datos.data.message) {
                    minix({icon: 'info', mensaje: datos.data.message, tiempo: 3000})
                    document.getElementById('campo_buscar_').focus()
                    this.busqueda = ''
                    this.resultados = []
                }else{
                    this.resultados = datos.data
                    document.getElementById('campo_buscar_').focus()
                    this.busqueda = ''
                }


            }
        }
    },
    mounted() {
        document.getElementById('campo_buscar_').focus()
    },

}
</script>

<style>

</style>