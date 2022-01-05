<template>
    
    <div class="seccion_b">
        <div class="sub_menu_a">



            <div class="top_cuerpo_seccion_b">
                Configuración
            </div>

            <div class="submenu_titulo">
                Registros
            </div>
            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-globe-americas"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('paises')">
                    Países
                </div>
            </div>
            <!-- <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="far fa-building"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('ciudades')">
                    Ciudades
                </div>
            </div> -->
            <!-- <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fab fa-itunes-note"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('cursos')">
                    Cursos
                </div>
            </div> -->
            <!-- <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('docentes')">
                    Docentes
                </div>
            </div> -->

            <!-- <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-user"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('pastores')">
                    Pastores
                </div>
            </div> -->
            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-cross"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('iglesias')">
                    Iglesias
                </div>
            </div>

            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('usuarios')">
                    Usuarios
                </div>
            </div>

            <!-- <div class="submenu_titulo">
                Registro Alumnos
            </div>

            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-database"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('Registro')">
                    Alumnos
                </div>
            </div> -->


        </div>


        <div class="cuerpo_seccion_b">
            <div class="top_cuerpo_seccion_b">
                
            </div>
            <div class="cuerpo_sub_seccion_b">

                <Paises v-if="sub_modulo == 'paises'"/>
                <!-- <Ciudades v-if="sub_modulo == 'ciudades'" />
                <Cursos v-if="sub_modulo == 'cursos'" />
                <Docentes v-if="sub_modulo == 'docentes'" /> -->
                <Pastores v-if="sub_modulo == 'pastores'" />
                <Iglesias v-if="sub_modulo =='iglesias'" />
                <Usuarios v-if="sub_modulo == 'usuarios'" />
                <!-- <Formulario v-if="sub_modulo == 'Formulario'" />
                <Listado v-if="sub_modulo == 'Listado'"/>
                <Registro v-if="sub_modulo == 'Registro'"/> -->
            </div>
        </div>
    </div>
</template>

<script>

import Paises from './Paises/Paises.vue'
// import Ciudades from './Ciudades/Ciudades.vue'
// import Cursos from './Cursos/Cursos.vue'
// import Docentes from './Docentes/Docentes.vue'
import Pastores from './Pastores/Pastores.vue'
import Iglesias from './Iglesias/Iglesias.vue'
import Usuarios from './Usuarios/Usuarios.vue'

export default {
    components:{
        Paises,
        Pastores,
        Iglesias,
        Usuarios
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