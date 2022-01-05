<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h2>
                    Usuarios
                </h2>
            </b-col>
            <b-col sm="12" class="mt-4">
                <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 35%;">
                                Nombre                                
                            </th>
                            <th style="width: 30%;">
                                Usuario
                            </th>
                            <th style="width: 15%; text-align: center;">
                                Estado
                            </th>
                            <th style="width: 20%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in usuarios" :key="index">
                            <td>
                                {{item.nombre}}
                            </td>
                            <td>
                                {{item.usuario}}
                            </td>
                            <td style="text-align: center;">
                                {{item.bloqueo | estado}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="primary"><i class="fas fa-pencil-alt"></i></b-button>
                                <b-button type="button" size="sm" style="margin-left: 10px;" @click="borrar(item.id)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import {IP, PUERTO} from '@/config/parametros'
import axios from 'axios'
import { pregunta } from '@/components/functions/alertas'

export default {
    name: 'Usuarios',
    filters:{
        estado: function(value){
            if (value == 0) {
                return 'Activo'
            }else{
                return 'Bloqueado'
            }
        }
    },
    data() {
        return {
            usuarios: []
        }
    },
    methods: {
        async obtenerUsuarios(){
            let u = await axios.get(`http://${IP}:${PUERTO}/api/usuarios`, this.$store.state.token)
            this.usuarios = u.data
        },
        async borrar(id){

             pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'usuarios',
                        id,
                        pull: false
                    }

                    await this.deleteData(f)
                    await this.obtenerUsuarios()
                }
            })

            

        },
        async actualizar(){

        },
        ...mapActions(['deleteData'])
    },
    mounted() {
        this.obtenerUsuarios()
    },
}
</script>

<style>

</style>