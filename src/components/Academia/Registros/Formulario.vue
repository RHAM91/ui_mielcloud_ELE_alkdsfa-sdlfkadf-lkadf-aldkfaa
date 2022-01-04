<template>
    <b-container fluid="">
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Ingresos
                    </h3>
                </b-col>
                <b-col sm="12" class="mt-4">
                    Nombre
                </b-col>
                <b-col sm="12" >
                    <h2>
                        {{info_item.nombre}}
                    </h2>
                </b-col>
                <b-col sm="10" class="mt-3">
                    <label for="">DPI*</label>
                    <b-form-input type="text" size="sm" v-model="dpi" readonly required></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-3">
                    <b-button type="button" block size="sm" variant="danger" style="margin-top: 31px;" @click="buscarMiembro">Búscar</b-button>
                </b-col>
                <b-col sm="6" class="mt-3">
                    <label for="">Iglesia*</label>
                    <!-- <b-form-input type="text" size="sm" v-model="iglesia"></b-form-input> -->
                    <select class="form-control form-control-sm" required v-model="iglesia">
                        <option value="">Selecciona</option>
                        <option v-for="(item, index) in iglesias" :key="index" :value="item.iglesia">{{item.iglesia}}</option>
                    </select>
                </b-col>
                <b-col sm="6" class="mt-3">
                    <label for="">Tipo de registro*</label>
                    <select class="form-control form-control-sm" id="select_tipo" required v-model="tipo">
                        <option value="">Selecciona</option>
                        <option value="DIEZMO">DIEZMO</option>
                        <option value="OFRENDA">OFRENDA</option>
                        <option value="DONACION">DONACIÓN</option>
                    </select>
                </b-col>
                <b-col sm="6" class="mt-3">
                    <label for="">Cantidad*</label>
                    <b-form-input type="number" step="0.01" placeholder="Q" size="sm" autocomplete="off" required v-model="cantidad"></b-form-input>
                </b-col>
                <b-col sm="6" class="mt-3">
                    <label for="">Fecha*</label>
                    <b-form-input type="date" size="sm" required v-model="fecha"></b-form-input>
                </b-col>
                <b-col sm="12" class="mt-3">
                    <label for="">NIT</label>
                    <b-form-input type="text" size="sm" v-model="nit"></b-form-input>
                </b-col>
                <b-col sm="12" class="mt-3">
                    <label for="">Comentario</label>
                    <!-- <b-form-input type="text" size="sm" v-model="comentario"></b-form-input> -->
                    <b-form-textarea
                        id="textarea-small"
                        size="sm"
                        v-model="comentario"
                        placeholder="(Opcional)"
                    ></b-form-textarea>
                </b-col>
                <b-col sm="6" class="mt-3">
                    * campos obligatorios
                </b-col>
                <b-col sm="6" class="mt-3 d-flex flex-row-reverse">
                    <b-button type="submit" size="sm" variant="success">Enviar</b-button>
                </b-col>
            </b-row>
        </form>

        <ModalBusqueda v-if="modal_busqueda" v-on:upinfo="setinfo" v-on:cerrar="buscarMiembro" />

    </b-container>

</template>

<script>
import { mapActions, mapState } from 'vuex'

import ModalBusqueda from './ModalBusqueda.vue'
import moment from 'moment'

export default {
    name: 'Ingresos',
    components:{
        ModalBusqueda
    },
    computed:{
        ...mapState(['iglesias'])
    },
    data() {
        return {
            dpi: '',
            nombre: '',
            iglesia: '',
            tipo: '',
            cantidad: '',
            fecha: moment(Date.now()).format('YYYY-MM-DD'),
            nit: '',
            comentario: '',
            modal_busqueda: false,
            info_item: {}
        }
    },
    methods: {
        setinfo(i){
            this.info_item = i
            this.dpi = i.dpi
            this.iglesia = i.iglesia
            this.nombre = i.nombre
            this.buscarMiembro()
        },
        async buscarMiembro(){
            this.modal_busqueda = !this.modal_busqueda
            document.getElementById('select_tipo').focus()
        },
        async guardar(){

            let formulario = {
                api: 'ingresos',
                pull: true,
                formulario: {
                    dpi: this.dpi,
                    nombre: this.nombre,
                    iglesia: this.iglesia,
                    tipo: this.tipo,
                    cantidad: this.cantidad,
                    fecha: this.fecha,
                    nit: this.nit,
                    comentario: this.comentario
                }
            }

            await this.saveData(formulario)

            this.dpi = ''
            this.nombre = ''
            this.iglesia = ''
            this.tipo = ''
            this.cantidad = ''
            this.fecha = moment(Date.now()).format('YYYY-MM-DD')
            this.nit = ''
            this.comentario = ''
            this.info_item = {}

        },
        ...mapActions(['saveData'])
    },
}
</script>

<style>

</style>