<template>
    <div class="contenedorFicha">
        <div class="cuerpoFicha">
            <div class="bannerFicha">
                <b-button type="button" variant="outline-danger" @click="salir" size="sm">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        Detalle <b-button type="button" variant="outline-info" size="sm" @click="activaredicion"><i class="fas fa-pen"></i></b-button>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <h2>
                            {{datosm.nombre}}
                        </h2>
                    </b-col>
                    <b-col v-if="edicion == false" sm="12" class="mt-3">
                        <table class="table table-bordered">
                            <tr>
                                <td style="font-weight: bold;width: 20%;">
                                    DPI:
                                </td>
                                <td style="width: 80%;">
                                    {{datosm.dpi | disponibilidad}}
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;width: 20%;">
                                    IGLESIA: 
                                </td>
                                <td style="width: 80%;">
                                    {{datosm.iglesia | disponibilidad}}
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;width: 20%;">
                                    CARGO: 
                                </td>
                                <td style="width: 80%;">
                                    {{datosm.cargo | disponibilidad}}
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;width: 20%;">
                                    TELÉFONO: 
                                </td>
                                <td style="width: 80%;">
                                    {{datosm.telefono | disponibilidad}}
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;width: 20%;">
                                    CORREO: 
                                </td>
                                <td style="width: 80%;">
                                    {{datosm.correo | disponibilidad}}
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;width: 20%;">
                                    DIRECCIÓN: 
                                </td>
                                <td style="width: 80%;">
                                    {{datosm.direccion | disponibilidad}}
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;width: 20%;">
                                    ESTADO: 
                                </td>
                                <td style="width: 80%;">
                                    {{datosm.activo | estado}}
                                </td>
                            </tr>
                        </table>
                    </b-col>
                    <b-col v-if="edicion" sm="12" class="mt-1">
                        <form @submit.prevent="guardarcambios">
                            <b-row>
                                <b-col sm="3" class="mt-3">
                                    <label for="">DPI</label>
                                    <b-form-input type="text" v-model="dpi_codigo" size="sm"></b-form-input>
                                </b-col>
                                <b-col sm="9" class="mt-3">
                                    <label for="">Nombre</label>
                                    <b-form-input type="text" v-model="nombre" size="sm"></b-form-input>
                                </b-col>
                                <b-col sm="6" class="mt-3">
                                    <label for="">Iglesia</label>
                                    <select class="form-control form-control-sm" required v-model="iglesia">
                                        <option value="">Selecciona</option>
                                        <option v-for="(item, index) in iglesias" :key="index" :value="item.iglesia">{{item.iglesia}}</option>
                                    </select>
                                </b-col>
                                <b-col sm="6" class="mt-3">
                                    <label for="">Cargo</label>
                                    <select class="form-control form-control-sm" required v-model="cargo">
                                        <option value="">Selecciona</option>
                                        <option value="miembro">Miembro</option>
                                        <option value="diacono">Diacono</option>
                                    </select>
                                </b-col>
                                <b-col sm="6" class="mt-3">
                                    <label for="">Teléfono</label>
                                    <b-form-input type="text" v-model="telefono" size="sm"></b-form-input>
                                </b-col>
                                <b-col sm="6" class="mt-3">
                                    <label for="">Correo</label>
                                    <b-form-input type="text" v-model="correo" size="sm"></b-form-input>
                                </b-col>
                                <b-col sm="12" class="mt-3">
                                    <label for="">Dirección</label>
                                    <b-form-input type="text" v-model="direccion" size="sm"></b-form-input>
                                </b-col>
                                <b-col sm="12" class="mt-3">
                                    <label for="">Estado</label>
                                    
                                    <select class="form-control form-control-sm" required v-model="estado">
                                        <option value="">Selecciona</option>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </b-col>
                                <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                                    <b-button type="submit" size="sm" variant="primary">Guardar cambios</b-button>
                                </b-col>
                            </b-row>
                        </form>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import {IP, PUERTO} from '@/config/parametros'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'DetalleMiembro',
    props:['dpi'],
    computed:{
        ...mapState(['iglesias'])
    },
    filters:{
        estado: function(value){
            if(value == 1){
                return 'Activo'
            }else{
                return 'Inactivo'
            }
        },
        disponibilidad: function(value){
            if (value == '' || value == undefined || value == null) {
                return 'Información no disponible'
            }else{
                return value
            }
        }
    },
    data() {
        return {
            edicion: false,
            datosm: {},
            dpi_codigo: '',
            nombre: '',
            iglesia: '',
            cargo: '',
            telefono: '',
            correo: '',
            direccion: '',
            estado: ''
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        },
        activaredicion(){
            this.edicion = !this.edicion

            this.dpi_codigo = this.datosm.dpi
            this.nombre = this.datosm.nombre
            this.iglesia = this.datosm.iglesia
            this.cargo = this.datosm.cargo
            this.telefono = this.datosm.telefono,
            this.correo = this.datosm.correo
            this.direccion = this.datosm.direccion
            this.estado = this.datosm.activo
        },
        async obtenerDetalle(){
            let f = await axios.get(`http://${IP}:${PUERTO}/api/miembros/${this.dpi}`, this.$store.state.token)
            this.datosm = f.data
        },
        async guardarcambios(){
            let data = {
                api: 'miembros',
                id: this.dpi,
                pull: false,
                formulario:{
                    dpi: this.dpi_codigo,
                    nombre: this.nombre.toUpperCase(),
                    iglesia: this.iglesia,
                    cargo: this.cargo,
                    telefono: this.telefono,
                    correo: this.correo,
                    direccion: this.direccion,
                    activo: this.estado
                }
            }

            await this.updateData(data)
            await this.obtenerDetalle()
            this.edicion = false
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        this.obtenerDetalle()
    },
}
</script>

<style>
    
</style>