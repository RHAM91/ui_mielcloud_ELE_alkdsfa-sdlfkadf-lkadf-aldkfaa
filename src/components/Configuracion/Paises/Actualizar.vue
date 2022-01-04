<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-info" size="sm" @click="salir">Cerrar</b-button>
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <b-form-input type="text" size="sm" id="campo_edicion_pais" v-model="pais" required placeholder="País"></b-form-input>
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
import { mapActions, mapState } from 'vuex'
export default {
    name: 'PaisesActualizacion',
    props: ['id'],
    computed:{
        ...mapState(['paises'])
    },
    data() {
        return {
            pais: '',
        }
    },
    methods: {
        salir(){
            this.$emit('SalirModal')
        },
        filtro(){
            let filtroPaises = this.paises.filter(pais => pais.id == this.id )
            this.pais = filtroPaises[0].pais
        },
        async guardar(){
            let data = {
                api: 'paises',
                pull: true,
                id: this.id,
                formulario: {
                    pais: this.pais
                }
            }

            await this.updateData(data)
            await this.salir()
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        this.filtro()
        document.getElementById('campo_edicion_pais').focus()
    },
}
</script>

<style>
    
</style>