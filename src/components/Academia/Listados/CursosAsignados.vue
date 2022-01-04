<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-info" size="sm" @click="salir">Cerrar</b-button>
                <div style="width:100%;text-align: center;">
                    Cursos Asignados
                </div>
            </div>
            <div class="cuerpo_asigandos">
                <b-container fluid="">
                    <b-row>
                        <b-col sm="10" class="mt-3">
                            <label for="">Lista de cursos</label>
                            <v-select :options="cursos" label="curso" :reduce="curso => `${curso.ci}-${curso.id}` " name="states[]" multiple="multiple" v-model="curso"></v-select>
                        </b-col>
                        <b-col sm="2" class="mt-5">
                            <b-button type="button" size="sm" block variant="info" @click="asignarCurso">Asignar</b-button>
                        </b-col>

                        <b-col sm="12" class="mt-3">
                            <table class="table table-sm table-bordered" style="font-size: 12px;">
                                <thead>
                                    <tr>
                                        <th style="width: 85%;">
                                            Instrumento
                                        </th>
                                        <th style="width: 15%;text-align: center;">
                                            ...
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in cursosAsig" :key="index">
                                        <td>
                                            {{dnsCurso(item.curso)}}
                                        </td>
                                        <td style="text-align: center;">
                                            <b-button type="button" variant="danger" size="sm" @click="eliminarCurso(item.id)" >D</b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import {IP, PUERTO} from '../../../config/parametros'
import { mapActions, mapState } from 'vuex'
import { minix, atexto } from '../../functions/alertas'

export default {
    name: 'AsignacionCursos',
    props:['codex'],
    computed:{
        ...mapState(['cursos'])
    },
    data() {
        return {
            curso: '',
            cursosAsig: []
        }
    },
    methods: {
        salir(){
            this.$emit('salir')
        },
        async obtenerCursosPorCodigoAlumno(){
            let cursos = await axios.get(`http://${IP}:${PUERTO}/api/cursos/codigoAlumno/${this.codex}`, this.$store.state.token)
            this.cursosAsig = cursos.data
        },
        async asignarCurso(){

            let formulario = {
                codigo_alumno: this.codex,
                curso: this.curso
            }


            let ss = await axios.post(`http://${IP}:${PUERTO}/api/cursos/asignar/`, formulario, this.$store.state.token)
            if (ss.data.asignados == true) {
                
                let nar = []

                for (let l = 0; l < ss.data.cursosYaAsignados.length; l++) {
                    const ix = ss.data.cursosYaAsignados[l];
                    
                    nar.push(this.dnsCurso(ix))

                }

                atexto({
                    titulo: 'Estos cursos ya fueron asignados:',
                    cuerpo: nar.join(', ').toString(),
                    icono: 'info'
                })
            }else{
                minix({icon: 'info', mensaje: ss.data.message, tiempo: 3000})
            }

            await this.obtenerCursosPorCodigoAlumno()
            this.curso = ''
        },
        async eliminarCurso(id){
            let fo = {
                api: 'cursos/borrarAsignado',
                pull: false,
                id
            }

            await this.deleteData(fo)
            await this.obtenerCursosPorCodigoAlumno()

        },
        dnsCurso(val){    

            let i = val.split('-')
            let n = this.cursos.filter(curso => curso.ci == i[0] && curso.id == i[1])

            return n[0].curso
        },
        ...mapActions(['deleteData'])
    },
    mounted() {
        this.obtenerCursosPorCodigoAlumno()
    },
}
</script>

<style>

</style>