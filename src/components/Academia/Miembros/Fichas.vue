<template>
   <div class="contenedorFicha">
       <div class="cuerpoFicha">
           <div class="bannerFicha">
               <b-button type="button" variant="outline-danger" @click="salir" size="sm">Cerrar</b-button>
           </div>
           <b-container fluid="">
               
               <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h1>
                                Registro de nuevo miembro
                            </h1>
                        </b-col>
                        <b-col sm="3" class="mt-5">
                            <label for="">DPI</label>
                            <b-form-input type="text" id="dpi_miembro" size="sm" v-model="dpi" required autocomplete="off"></b-form-input>
                        </b-col>
                        <b-col sm="9" class="mt-5">
                            <label for="">Nombre completo</label>
                            <b-form-input type="text" size="sm" v-model="nombre" required autocomplete="off"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Iglesia</label>
                            <!-- <b-form-input type="text" size="sm" v-model="iglesia" required></b-form-input> -->
                            <select class="form-control form-control-sm" v-model="iglesia">
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in iglesias" :key="index" :value="item.iglesia">{{item.iglesia}}</option>
                            </select>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Cargo</label>
                            <select class="form-control form-control-sm" v-model="cargo">
                                <option value="">Selecciona</option>
                                <option value="Miembro">Miembro</option>
                                <option value="Diacono">Diacono</option>
                            </select>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">País</label>
                            <select class="form-control form-control-sm" v-model="pais">
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in paises" :key="index" :value="item.pais">{{item.pais}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" size="sm" variant="success">Guardar</b-button>
                        </b-col>
                    </b-row>
                </form>

           </b-container>
       </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Ficha',
    computed:{
        ...mapState(['iglesias', 'paises'])
    },
    data() {
        return {
            dpi: '',
            nombre: '',
            iglesia: '',
            cargo: 'Miembro',
            pais: '',
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        },
        async guardar(){

            let formulario = {
                api: 'miembros',
                pull: false,
                formulario: {
                    dpi: this.dpi,
                    nombre: this.nombre.toUpperCase(),
                    iglesia: this.iglesia,
                    cargo: this.cargo,
                    pais: this.pais
                }
            }

            let a = await this.saveData(formulario)
            
            if (a != 'YE') {
                this.dpi = ''
                this.nombre = ''
                this.iglesia = ''
                this.cargo = 'Oveja'
                this.pais = ''
                document.getElementById('dpi_miembro').focus()
            }
        },
        ...mapActions(['saveData'])
    },
    mounted() {
        document.getElementById('dpi_miembro').focus()
    },
}
</script>

<style>
    .contenedorFicha{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .cuerpoFicha{
            width: 80%;
            height: 80%;
            background-color: white;
        }

        .bannerFicha{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #eeee;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            padding-right: 10px;
        }
</style>