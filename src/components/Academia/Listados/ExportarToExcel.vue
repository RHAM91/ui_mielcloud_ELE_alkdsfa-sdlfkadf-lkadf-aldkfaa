<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h3>
                    Exportar a Excel
                </h3>
            </b-col>
            <b-col sm="10" class="mt-3">
                <label for="">Selecciona un estado para exportar</label>
                <select class="form-control form-control-sm" id="select-estado" v-model="estado">
                    <option value="">Selecciona</option>
                    <option value="Inicial">Inicial</option>
                    <option value="Solvente">Solvente</option>
                    <option value="Insolvente">insolvente</option>
                    <option value="Desactivado">Desactivado</option>
                </select>
            </b-col>
            <b-col sm="2" class="mt-5">
                <b-button type="button" block variant="success" size="sm" @click="generarExcel">Generar</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import axios from 'axios'
import { IP, PUERTO } from '../../../config/parametros'
import excel from 'xlsx'
import { mapMutations } from 'vuex'
import { minix } from '../../functions/alertas'

export default {
    name: 'ExportToExel',
    data() {
        return {
            estado: ''
        }
    },
    methods: {
        async generarExcel(){

            if (this.estado == '') {
                alert('Selecciona un estado')
                document.getElementById('select-estado').focus()
            }else{

                this.set_loading(true)
    
                let d = await axios.get(`http://${IP}:${PUERTO}/api/alumnos/filtro/estado/${this.estado}`, this.$store.state.token)


                if (d.data.message == 'NO EXISTEN REGISTROS') {

                    minix({icon: 'info', mensaje: 'No se generó reporte por falta de datos', tiempo: 3000})
                    this.set_loading(false)

                }else{
                    let f = await excel.utils.json_to_sheet(d.data)
                    const workbook = excel.utils.book_new()
                    const filename = `Reporte estado ${this.estado}`
                    excel.utils.book_append_sheet(workbook, f, filename)
        
                    excel.writeFile(workbook, `${filename}.xlsx`)
        
                    if (d.status == 200) {
                        this.set_loading(false)
                    }
                }
        
            }

        },
        ...mapMutations(['set_loading'])
    },
}
</script>

<style>

</style>