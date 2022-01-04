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
                            <label for="">Nombre de la Iglesia</label>
                            <b-form-input type="text" size="sm" id="campo_edicion_iglesia" v-model="iglesia" required placeholder="Iglesia"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Pastor</label>
                            <select class="form-control form-control-sm" v-model="pastor">
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in pastores" :key="index" :value="`${item.ci}-${item.id}`">{{item.nombre}}</option>
                            </select>
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
import { mapActions, mapGetters, mapState} from 'vuex'
import axios from 'axios'
import { IP, PUERTO } from '../../../config/parametros'


export default {
    name: 'CiudadesActualizacion',
    props: ['id'],
    computed:{
        ...mapGetters({
            scitys: 'dnsCities'
        })
    },
    data() {
        return {
            iglesia:'',
            pastor: '',
            pastores: []
        }
    },
    methods: {
        salir(accion){
            this.$emit('SalirModal', accion)
        },
        async obtenerDatos(){
            let datos = await axios.get(`http://${IP}:${PUERTO}/api/pastores/`, this.$store.state.token)
            this.pastores = datos.data
        },
        async obtenerIglesias(){
            let codigo = `${this.ci}-${this.id}`
            let iglesia = await axios.get(`http://${IP}:${PUERTO}/api/iglesias/${codigo}`, this.$store.state.token)


            this.iglesia = iglesia.data.iglesia
            this.pastor = iglesia.data.pastor
        },
        async guardar(){
            let data = {
                api: 'iglesias',
                pull: false,
                id: `${this.ci}-${this.id}`,
                formulario: {
                    pastor: this.pastor,
                    iglesia: this.iglesia
                }
            }

            await this.updateData(data)
            await this.salir('actualizar')
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        this.obtenerDatos()
        this.obtenerIglesias()
        document.getElementById('campo_edicion_iglesia').focus()
    },
}
</script>

<style>
    
</style>