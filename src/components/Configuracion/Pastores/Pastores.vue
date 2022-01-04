<template>
    <b-container fluid>
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h2>
                        Registro de Pastores
                    </h2>
                </b-col>
                <b-col sm="5" class="mt-3">
                    <label for="">Nombre del pastor</label>
                    <b-form-input type="text" size="sm" v-model="pastor" id="campo_pastor" required placeholder="Pastor"></b-form-input>
                </b-col>
                <b-col sm="3" class="mt-3">
                    <label for="">Teléfono</label>
                    <b-form-input type="text" size="sm" v-model="telefono" required placeholder="Teléfono"></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-3">
                    <label for="">Correo</label>
                    <b-form-input type="text" size="sm" v-model="correo" required placeholder="@"></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-5">
                    <b-button type="submit" block variant="success" size="sm">Guardar</b-button>
                </b-col>
                <b-col sm="12" class="mt-4">
                    <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 50%;">
                                    Pastor
                                </th>
                                <th style="width: 20%;text-align: center;">
                                    Teléfono
                                </th>
                                <th style="width: 20%;text-align: center;">
                                    Correo
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in pastores" :key="index">
                                <td>
                                    {{item.pastor}}
                                </td>
                                <td style="text-align: center;">
                                    {{item.iglesia}}
                                </td>
                                <td style="text-align: center;">
                                    
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" style="margin-right: 10px;font-size: 10px;" variant="info" size="sm" @click="abrirModal(item.ci, item.id)"><i class="fas fa-pencil-alt"></i></b-button>
                                    <b-button type="button" style="font-size: 10px;" variant="danger" size="sm" @click="eliminar(item.ci, item.id)"><i class="fas fa-trash-alt"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </form>

        <Actualizacion v-if="modalActualizacion" :ci="ci" :id="id" v-on:SalirModal="cerrarModal($event)" />

    </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import { IP, PUERTO } from '../../../config/parametros'

import Actualizacion from './Actualizar.vue'
import { pregunta } from '../../functions/alertas'

export default {
    name: 'Pastores',
    components:{
        Actualizacion
    },
    data() {
        return {
            pastor: '',
            telefono: '',
            correo: '',
            modalActualizacion: false,
            ci: '',
            id: '',
            pastores: []
        }
    },
    methods: {
        async guardar(){

            let formulario = {
                api: 'pastores',
                pull: true,
                formulario: {
                    nombre: this.pastor,
                    telefono: this.telefono,
                    correo: this.correo
                }
            }

            await this.saveData(formulario)
            await this.obtenerDatos()
            this.pastor = ''
            this.telefono = ''
            this.correo = ''

        },
        async obtenerDatos(){
            let datos = await axios.get(`http://${IP}:${PUERTO}/api/pastores`, this.$store.state.token)
            this.pastores = datos.data
        },
        async eliminar(ci, id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let formulario = {
                        api: 'pastores',
                        pull: true,
                        id: `${ci}-${id}`
                    }

                    await this.deleteData(formulario)
                    await this.obtenerDatos()
                }
            })

        },
        async cerrarModal(evento){
            this.modalActualizacion = false

            if (evento == 'actualizar') {
                await this.obtenerDatos()
            }
        },
        abrirModal(ci, id){
            this.modalActualizacion = true
            this.ci = ci
            this.id = id
        },
        ...mapActions(['saveData', 'deleteData'])
    },
    mounted() {
        this.obtenerDatos()
        document.getElementById('campo_pastor').focus()
    },
}
</script>

<style>

</style>