<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-info" size="sm" @click="salir('nada')">Cerrar</b-button>
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <label for="">Pastor</label>
                            <b-form-input type="text" size="sm" id="campo_edicion_pastor" v-model="pastor" required placeholder="Nombre"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Teléfono</label>
                            <b-form-input type="text" size="sm" v-model="telefono" required placeholder="telefono"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Correo</label>
                            <b-form-input type="text" size="sm" v-model="correo" required placeholder="@"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" variant="success" size="sm">Actualizar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import { IP, PUERTO } from '../../../config/parametros'
export default {
    name: 'PastoresActualizacion',
    props: ['ci', 'id'],
    data() {
        return {
            pastor: '',
            telefono: '',
            correo: '',
        }
    },
    methods: {
        salir(accion){
            this.$emit('SalirModal', accion)
        },
        async obtenerDatos(){
            let codigo = `${this.ci}-${this.id}`
            let datos = await axios.get(`http://${IP}:${PUERTO}/api/pastores/${codigo}`, this.$store.state.token)
            this.pastor = datos.data.nombre
            this.telefono = datos.data.telefono
            this.correo = datos.data.correo
        },
        async guardar(){
            let data = {
                api: 'pastores',
                pull: true,
                id: `${this.ci}-${this.id}`,
                formulario: {
                    nombre: this.pastor,
                    telefono: this.telefono,
                    correo: this.correo
                }
            }

            await this.updateData(data)
            await this.salir('actualizar')
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        this.obtenerDatos()
        document.getElementById('campo_edicion_pastor').focus()
    },
}
</script>

<style>
    
</style>