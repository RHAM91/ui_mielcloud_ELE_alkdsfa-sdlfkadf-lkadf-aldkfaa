<template>
    <b-container fluid>
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h2>
                        Registro de Países
                    </h2>
                </b-col>
                <b-col sm="10" class="mt-3">
                    <b-form-input type="text" size="sm" v-model="pais" id="campo_pais" required placeholder="País"></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-3">
                    <b-button type="submit" block variant="success" size="sm">Guardar</b-button>
                </b-col>
                <b-col sm="12" class="mt-4">
                    <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 90%;">
                                    País
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in paises" :key="index">
                                <td>
                                    {{item.pais}}
                                </td>
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

        <Actualizacion v-if="modalActualizacion" :id="id" v-on:SalirModal="cerrarModal" />

    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Actualizacion from './Actualizar.vue'
import { pregunta } from '../../functions/alertas'

export default {
    name: 'Paises',
    computed: {
        ...mapState(['paises'])
    },
    components:{
        Actualizacion
    },
    data() {
        return {
            pais: '',
            modalActualizacion: false,
            id: ''
        }
    },
    methods: {
        async guardar(){

            let formulario = {
                api: 'paises',
                pull: true,
                formulario: {
                    pais: this.pais,
                }
            }

            await this.saveData(formulario)
            this.pais = ''

        },
        async eliminar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let formulario = {
                        api: 'paises',
                        pull: true,
                        id
                    }

                    await this.deleteData(formulario)
                }
            })

        },
        cerrarModal(){
            this.modalActualizacion = false
        },
        abrirModal(id){
            this.modalActualizacion = true
            this.id = id
        },
        ...mapActions(['saveData', 'deleteData'])
    },
    mounted() {
        document.getElementById('campo_pais').focus()
    },
}
</script>

<style>

</style>