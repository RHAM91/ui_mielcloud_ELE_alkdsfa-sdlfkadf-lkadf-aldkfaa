<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <h3>
                    Alumnos
                </h3>
            </b-col>
            <b-col sm="2" class="mt-2">
                <select class="form-control form-control-sm" v-model="filtro" @change="setear_filtro_busqueda">
                    <option value="" disabled>Filtro</option>
                    <option value="alumno">Alumno</option>
                    <option value="pastor">Pastor</option>
                    <option value="iglesia">Iglesia</option>
                    <option value="codigo">Código</option>
                    <option value="telefono">Teléfono</option>
                </select>
            </b-col>
            
            <b-col sm="10" class="mt-2" v-if="filtro == 'alumno'">
                <b-input-group size="sm">
                    <b-form-input type="search" v-model="search" id="clie" size="sm" placeholder="Buscar" autocomplete="off"></b-form-input>
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                </b-input-group>
            </b-col>

            <b-col sm="10" class="mt-2" v-if="filtro == 'pastor'">
                <v-select :options="pastores" label="nombre" @input="configurarPastor()" :reduce="nombre => `${nombre.ci}-${nombre.id}`" v-model="pastor"></v-select>
            </b-col>

            <b-col sm="10" class="mt-2" v-if="filtro == 'iglesia'">
                <v-select :options="iglesias" label="iglesia" @input="configurarIglesia()" :reduce="iglesia => `${iglesia.ci}-${iglesia.id}`" v-model="iglesia"></v-select>
            </b-col>

            <b-col sm="10" class="mt-2" v-if="filtro == 'codigo'">
                <b-input-group size="sm">
                    <b-form-input type="search" v-model="search" size="sm" placeholder="Buscar" autocomplete="off"></b-form-input>
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                </b-input-group>
            </b-col>

            <b-col sm="10" class="mt-2" v-if="filtro == 'telefono'">
                <b-input-group size="sm">
                    <b-form-input type="number" v-model="search" size="sm" placeholder="Buscar" autocomplete="off"></b-form-input>
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                </b-input-group>
            </b-col>

            <b-col sm="12" class="mt-3">
                <b-table class="table-bordered table-striped" 
                :items="alumnos_filtrados"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage"
                small
                style="font-size: 13px;"
                >

                <template v-slot:cell(no) = 'conta'>
                    <div>
                        {{conta.index + 1}}
                    </div>
                </template>

                <template v-slot:cell(curso) = 'curs'>
                    <div>
                        <div style="display: flex; justify-content:center;align-items:center;height: 40px;">
                            <b-button type="button" size="sm" title="Lista instrumentos" @click="verCursosAsignados(curs.item.codigo)" variant="outline-info"><i class="far fa-eye"></i></b-button>
                        </div> 
                    </div>
                </template>

                <template v-slot:cell(cuota) = 'cta'>
                    <div style="text-align: center;">
                        Q{{ cta.item.cuota }}
                    </div>
                </template>

                <template v-slot:cell(iglesia) = 'igl'>
                    <div style="text-align: center;">
                        {{ filtroIglesia(igl.item.iglesia) }}
                    </div>
                </template>

                <template v-slot:cell(pastor) = 'ptr'>
                    <div style="text-align: center;">
                        {{ filtroPastore(ptr.item.pastor) }}
                    </div>
                </template>

                <template v-slot:cell(estado) = 'esta'>
                   <div :class="esta.item.estado == 'Inicial' ? 'cuadro_estado_inicial': esta.item.estado == 'Solvente' ? 'cuadro_estado_solvente': 'cuadro_estado_insolvente'">
                        {{esta.item.estado}}
                    </div>
                </template>

                <template v-slot:cell(btn) = 'bt'>
                    <div style="display: flex; justify-content:center;align-items:center;height: 40px;">
                        <b-button type="button" size="sm" title="Ficha alumno" variant="warning" @click="modal_ficha(bt.item.codigo)"><i class="fas fa-info-circle"></i></b-button>
                    </div>
                </template>

                </b-table>

                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                ></b-pagination>
            </b-col>

        </b-row>


        <CursosAsignados v-if="modalCursosAsignados" :codex="codigo" v-on:salir="cerrarModalCursosAsignados" />
        <Ficha v-if="modalFicha" :codigoa="codigo" v-on:salir="modal_ficha" />

    </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import CursosAsignados from './CursosAsignados.vue'
import Ficha from './Ficha.vue'


export default {
    name: 'TodosLosAlumnos',
    components:{
        CursosAsignados,
        Ficha
    },
    computed:{
        ...mapState(['alumnos', 'pastores', 'iglesias']),
        search:{
            get(){
                return this.$store.state.filtros.filtro_alumno
            },
            set(val){
                this.$store.commit('set_filtro_alumnos', val.toLowerCase())
            }
        },
        rows(){
            return this.alumnos_filtrados.length
        },
        ...mapGetters({
            alumnos_filtrados: 'filtro_busqueda_alumnos'
        }),
    },
    data() {
        return {
            filtro: '',
            pastor: '',
            iglesia: '',
            codigo: '',
            modalFicha: '',
            modalCursosAsignados: false,
            perPage: 15,
            currentPage: 1,
            fields: [
                {
                    key: 'no',
                    thStyle: 'width: 3%;',
                },
                {
                    key: 'codigo',
                    thStyle: 'width: 8%;',
                },
                {
                    key: 'nombre',
                    thStyle: 'width: 21%;'
                },
                {
                    key: 'curso',
                    thStyle: 'width: 5%;text-align: center;'
                },
                {
                    key: 'cuota',
                    thStyle: 'width: 10%;text-align: center;'
                },
                {
                    key: 'telefono',
                    thStyle: 'width: 10%;'
                },
                {
                    key: 'iglesia',
                    thStyle: 'width: 15%;text-align:center;'
                },
                {
                    key: 'pastor',
                    thStyle: 'width: 10%;text-align:center;'
                },
                {
                    key: 'estado',
                    thStyle: 'width: 10%;text-align:center;'
                },
                {
                    key: 'btn',
                    thStyle: 'width: 8%;text-align:center;'
                }
            ]
        }
    },
    methods: {
        setear_filtro_busqueda(){
            this.set_tipo_de_filtrado(this.filtro)
            this.search = ''
        },
        configurarPastor(){
            this.search = this.pastor.toLowerCase()
        },
        configurarIglesia(){
            this.search = this.iglesia.toLowerCase()
        },
        filtroIglesia(val){
        
            let i = val.split('-')

            let n = this.iglesias.filter(igl => igl.ci == i[0] && igl.id == i[1])

            return n[0].iglesia
        },
        filtroPastore(val){
            let i = val.split('-')
            let n = this.pastores.filter(ptr => ptr.ci == i[0] && ptr.id == i[1])

            return n[0].nombre
        },
        verCursosAsignados(code){
            this.codigo = code
            this.modalCursosAsignados = true
        },
        modal_ficha(code){
            this.codigo = code
            this.modalFicha = !this.modalFicha
        },
        cerrarModalCursosAsignados(){
            this.modalCursosAsignados = false
        },
        ...mapMutations(['set_tipo_de_filtrado']),
        ...mapActions(['dnsIglesias'])
    },
    mounted() {
        this.dnsIglesias()
        //document.getElementById('clie').focus()
    },
}
</script>

<style>
    .cuadro_estado_solvente{
        width: 100%;
        height: 40px;
        background-color: #88AD28;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }

    .cuadro_estado_insolvente{
        width: 100%;
        height: 40px;
        background-color: red;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }

    .cuadro_estado_inicial{
        width: 100%;
        height: 40px;
        background-color: #7cc6fe;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
</style>