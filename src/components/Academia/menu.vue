<template>
    
    <div class="seccion_b">
        <div class="sub_menu_a">


            <div class="top_cuerpo_seccion_b">
                Menú
            </div>

            <div class="submenu_titulo">
                Movimientos
            </div>
            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('formulario')">
                    Ingresos
                </div>
            </div>

             <!-- <div class="submenu_titulo">
                Exportación
            </div>
            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-file-excel"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('exportar_a_excel')">
                    Exportar a Excel
                </div>
            </div> -->

            <div class="submenu_titulo">
                Registros
            </div>
            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-database"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('miembros')">
                    Miembros
                </div>
            </div>
            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('pagos')">
                    Ficha miembro
                </div>
            </div>
           

            


        </div>


        <div class="cuerpo_seccion_b">
            <div class="top_cuerpo_seccion_b">
                
            </div>
            <div class="cuerpo_sub_seccion_b">

                <ExportarToExcel v-if="sub_modulo == 'exportar_a_excel'" />
                <Pagos v-if="sub_modulo == 'pagos'" />
                <Formulario v-if="sub_modulo == 'formulario'" />
                <Miembros v-if="sub_modulo == 'miembros'" />
                
            </div>
        </div>
    </div>
</template>

<script>

import Pagos from './Listados/Pagos.vue'
import Miembros from './Miembros/Formulario.vue'
import Formulario from './Registros/Formulario.vue'

export default {
    components:{
        Pagos,
        Formulario,
        Miembros
    },
    data() {
        return {
            sub_modulo: ''
        }
    },
    methods: {
        set_submodulo(modulo){
            this.sub_modulo = modulo
        }
    },
}
</script>

<style>
    
</style>