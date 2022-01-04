<template>
    <b-container fluid>
        <form @submit.prevent="guardar" id="formulario_alumno">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h2>
                        Inscripción del alumno
                    </h2>
                </b-col>
                <b-col sm="12" class="mt-3">
                    <label for="">Nombre completo</label>
                    <b-form-input type="text" size="sm" v-model="nombre" required @keyup="guardarEnStorage" ></b-form-input>
                </b-col>


                <b-col sm="4" class="mt-3">
                    <label for="">Teléfono</label>
                    <b-form-input type="number" v-model="telefono" required size="sm" @keyup="guardarEnStorage"></b-form-input>
                </b-col>
                <b-col sm="4" class="mt-3">
                    <label for="">Correo</label>
                    <b-form-input type="text" v-model="correo" size="sm" @keyup="guardarEnStorage"></b-form-input>
                </b-col>
                <b-col sm="4" class="mt-3">
                    <label for="">Dirección</label>
                    <b-form-input type="text" v-model="direccion" size="sm" @keyup="guardarEnStorage"></b-form-input>
                </b-col>


                <b-col sm="6" class="mt-3">
                    <label for="">Pastor</label>
                    <v-select :options="pastores" label="nombre" :reduce="nombre => `${nombre.ci}-${nombre.id}`" v-model="pastor" @change="guardarEnStorage"></v-select>
                </b-col>
                <b-col sm="6" class="mt-3">
                    <label for="">Iglesia</label>
                    <v-select :options="iglesias" label="iglesia" :reduce="iglesia => `${iglesia.ci}-${iglesia.id}`" v-model="iglesia" @change="guardarEnStorage"></v-select>
                </b-col>


                <b-col sm="4" class="mt-3">
                    <label for="">País</label>
                    <select class="form-control form-control-sm" v-model="pais" required @change="filtroDeCiudadesPorPais">
                        <option value="">Selecciona</option>
                        <option v-for="(item, index) in paises" :key="index" :value="`${item.ci}-${item.id}`">{{item.pais}}</option>
                    </select>
                </b-col>
                <b-col sm="4" class="mt-3">
                    <label for="">Ciudad</label>
                    <select class="form-control form-control-sm" required v-model="ciudad" @change="guardarEnStorage">
                        <option value="">Selecciona</option>
                        <option v-for="(item, index) in ciudadesFiltradas" :key="index" :value="`${item.ci}-${item.id}`">{{item.ciudad}}</option>
                    </select>
                </b-col>
                <b-col sm="4" class="mt-3">
                    <label for="">Region</label>
                    <b-form-input type="number" size="sm" v-model="region" @keyup="guardarEnStorage"></b-form-input>
                </b-col>


                <b-col sm="12" class="mt-3">
                    <label for="">Cursos</label>
                    <v-select :options="cursos" label="curso" :reduce="curso => `${curso.ci}-${curso.id}` " name="states[]" multiple="multiple" v-model="curso" @change="guardarEnStorage"></v-select>
                </b-col>
                <b-col sm="12" class="mt-3">
                    <label for="">Docente</label>
                    <select class="form-control form-control-sm" v-model="docente" @change="guardarEnStorage">
                        <option value="">Selecciona</option>
                        <option v-for="(item, index) in docentes" :key="index" :value="`${item.ci}-${item.id}`">{{item.nombre}}</option>
                    </select>
                </b-col>
                <b-col sm="12" class="mt-3">
                    <label for="">Monto de inscripción</label>
                    <b-form-input type="number" step="0.01" v-model="cuota" required placeholder="Q" size="sm" @keyup="guardarEnStorage"></b-form-input>
                </b-col>
                <b-col sm="6" class="mt-3">
                    <b-button type="button" size="sm" variant="outline-danger" @click="limpiarStorage">Limpiar</b-button>
                </b-col>
                <b-col sm="6" class="mt-3 d-flex flex-row-reverse">
                    <b-button type="submit" size="sm" variant="success">Inscribir</b-button>
                </b-col>
            </b-row>
        </form>
    </b-container>
</template>

<script>

import axios from 'axios'
import { IP, PUERTO } from '../../../config/parametros'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
    name: 'Inscripcion',
    computed:{
        ...mapState(['paises', 'cursos', 'docentes', 'formulario_inscripcion']),
        ...mapGetters({
            citys: 'dnsCities'
        })
    },
    data() {
        return {
            nombre: '',
            telefono: '',
            correo: '',
            direccion: '',
            pastor: '',
            iglesia: '',
            pais: '',
            ciudad: '',
            region: '',
            curso: '',
            docente: '',
            cuota: '',

            pastores: [],
            iglesias: [],
            ciudadesFiltradas: []
        }
    },
    methods: {
        async obtenerListaPastores(){
            let datos = await axios.get(`http://${IP}:${PUERTO}/api/pastores`, this.$store.state.token)
            this.pastores = datos.data
        },
        async obtenerListaIglesias(){

            let datos = await axios.get(`http://${IP}:${PUERTO}/api/iglesias/pastor/${this.pastor}`, this.$store.state.token)
            this.iglesias = datos.data
        },
        filtroDeCiudadesPorPais(){
            let filtro = this.citys.filter(ciudad => ciudad.cipais == this.pais)
            this.ciudadesFiltradas = filtro
        },
        guardarEnStorage(){

            console.log('guardando en storage')

            let formulario = {
                nombre: this.nombre,
                telefono: this.telefono,
                correo: this.correo, 
                direccion: this.direccion,
                pastor: this.pastor,
                iglesia: this.iglesia,
                pais: this.pais,
                ciudad: this.ciudad,
                region: this.region,
                curso: this.curso,
                docente: this.docente,
                cuota: this.cuota
            }

            let linea = JSON.stringify(formulario)
            this.set_formulario_inscripcion(linea)
        },
        recuperarDatosFormularioEnStorage(){
            if (this.formulario_inscripcion.length == 0) {
                console.log('no hay datos guardados')
            }else{
                let formulario = JSON.parse(this.formulario_inscripcion)
                
                this.nombre = formulario.nombre
                this.telefono = formulario.telefono
                this.correo = formulario.correo
                this.direccion = formulario.direccion
                this.pastor = formulario.pastor
                this.iglesia = formulario.iglesia
                this.pais = formulario.pais
                this.ciudad = formulario.ciudad
                this.region = formulario.region
                this.curso = formulario.curso
                this.docente = formulario.docente
                this.cuota = formulario.cuota

            }

        },
        limpiarStorage(){
            let x = []
            this.set_formulario_inscripcion(x)
            this.nombre = ''
            this.telefono = ''
            this.correo = ''
            this.direccion = ''
            this.pastor = ''
            this.iglesia = ''
            this.pais = ''
            this.ciudad = ''
            this.region = ''
            this.curso = ''
            this.docente = ''
            this.cuota = ''
            
        },
        async guardar(){
            
            if(this.pastor == '' || this.iglesia == '' || this.curso == '' || this.curso.length == 0){
                alert('Uno o más campos están vacios')
            }else{
                let data = {
                    api: 'alumnos',
                    pull: true,
                    formulario: {
                        nombre: this.nombre,
                        telefono: this.telefono,
                        correo: this.correo, 
                        direccion: this.direccion,
                        pastor: this.pastor,
                        iglesia: this.iglesia,
                        pais: this.pais,
                        ciudad: this.ciudad,
                        region: this.region,
                        curso: this.curso,
                        docente: this.docente,
                        cuota: this.cuota
                    }
                }
    
                await this.saveData(data)
                await this.limpiarStorage()
            }

        },
        ...mapActions(['saveData']),
        ...mapMutations(['set_formulario_inscripcion']),
    },
    watch:{
        pastor: function(val){
            if(val != ''){
                this.obtenerListaIglesias()
            }
        }
    },
    mounted() {
        this.obtenerListaPastores()
        this.recuperarDatosFormularioEnStorage()
    },
}
</script>

<style>

</style>