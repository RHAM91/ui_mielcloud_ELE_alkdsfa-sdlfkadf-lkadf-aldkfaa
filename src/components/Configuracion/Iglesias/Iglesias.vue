<template>
    <b-container fluid>
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h2>
                        Registro de Iglesias
                    </h2>
                </b-col>
                <b-col sm="10" class="mt-3">
                    <label for="">Nombre de la Iglesia</label>
                    <b-form-input type="text" size="sm" v-model="iglesia" id="campo_iglesia" required placeholder="Iglesia"></b-form-input>
                </b-col>
                <!-- <b-col sm="5" class="mt-3">
                    <label for="">Nombre del Pastor</label>
                    <select class="form-control form-control-sm" v-model="pastor" required>
                        <option value="">Selecciona</option>
                        <option v-for="(item, index) in pastores" :key="index" :value="`${item.ci}-${item.id}`">{{item.nombre}}</option>
                    </select>
                </b-col> -->
                <b-col sm="2" class="mt-5">
                    <b-button type="submit" block variant="success" size="sm">Guardar</b-button>
                </b-col>
                <b-col sm="12" class="mt-4">
                    <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 90%;">
                                    Iglesia
                                </th>
                                <!-- <th style="width: 30%;text-align: center;">
                                    Pastor
                                </th> -->
                                <th style="width: 10%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in iglesias" :key="index">
                                <td>
                                    {{item.iglesia}}
                                </td>
                                <!-- <td style="text-align: center;">
                                    {{item.pastor}}
                                </td> -->
                                <td style="text-align: center;">
                                    <b-button type="button" style="margin-right: 10px;font-size: 10px;" variant="info" size="sm" @click="abrirModal(item.id)"><i class="fas fa-pencil-alt"></i></b-button>
                                    <b-button type="button" style="font-size: 10px;" variant="danger" size="sm" @click="eliminar(item.id)"><i class="fas fa-trash-alt"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </form>

        <Actualizacion v-if="modalActualizacion" :id="id" />

    </b-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import axios from 'axios'
import { IP, PUERTO } from '../../../config/parametros'

import Actualizacion from './Actualizar.vue'
import { pregunta } from '../../functions/alertas'

export default {
    name: 'Iglesias',
    components:{
        Actualizacion
    },
    computed:{
        ...mapState(['iglesias'])
    },
    data() {
        return {
            iglesia: '',
            modalActualizacion: false,
            id: '',
            //iglesias: [],
        }
    },
    methods: {
        async guardar(){

            let formulario = {
                api: 'iglesias',
                pull: true,
                formulario: {
                    iglesia: this.iglesia.toUpperCase(),
                    pais: 'GUATEMALA'
                }
            }

            await this.saveData(formulario)
            this.iglesia = ''

        },
        async eliminar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let formulario = {
                        api: 'iglesias',
                        pull: true,
                        id
                    }

                    await this.deleteData(formulario)
                }
            })

        },
        async cerrarModal(evento){
            this.modalActualizacion = false

            if (evento == 'actualizar') {
                await this.dnsIglesias()
            }
        },
        abrirModal(id){
            this.modalActualizacion = true
            this.id = id
        },
        ...mapActions(['saveData', 'deleteData'])
    },
    mounted() {
        //this.obtenerDatos()
        //this.dnsIglesias() // se colocó aqui esta funcion debido que en los getters no se podía usar como asincrono entonces se hizo un action que si se puede usar como asincrono
        document.getElementById('campo_iglesia').focus()
    },
}
</script>

<style>

</style>