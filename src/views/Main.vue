<template>
    <div class="contenedor">
        <div class="asidex">
            <div class="icono_menu_a" @click="set_modulo('Academia')">
                Ac
            </div>
            <div class="icono_menu_a" @click="set_modulo('Configuracion')">
                Cf
            </div>
            <div class="vversion">
                {{version}}
            </div>
            <b-button type="button" class="btn_logout" size="sm" title="Cerrar Sesión" variant="danger" @click="salir"><i class="fas fa-sign-out-alt"></i></b-button>

        </div>
        

        <div class="seccion_a">
            <div class="top_verde">
                <Loading />
            </div>


            <Academia v-if="modulo == 'Academia'" />
            <Configuracion v-if="modulo == 'Configuracion'" />

        </div>

        <div v-if="update" class="btn_actualizacion">
            Actualizar
        </div>
    </div>
</template>

<script>

import {IP, PUERTO} from '../config/parametros'
import { pregunta } from '../components/functions/alertas'

import Vue from 'vue'
import store from '../store'
import VueSocketIOExt from 'vue-socket.io-extended'
import  io  from 'socket.io-client'
import axios from 'axios'
import { ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer

import { mapActions } from 'vuex'

import Academia from '../components/Academia/menu.vue'
import Configuracion from '../components/Configuracion/menu.vue'
import Loading from '../components/others/Loading.vue'

export default {
    name: 'Pricipal',
    components:{
        Academia,
        Configuracion,
        Loading
    },
    data() {
        return {
            modulo: '',
            sub_menu: '',
            update: false,
            version: ''
        }
    },
    methods: {
        set_modulo(modulo){
            this.modulo = modulo
        },
        salir(){

            pregunta({titulo: 'Seguro que deseas salir?', texto: 'Está a punto de salir del sistema', afirmacion: 'Si, salir!'}, async (i) =>{

                if (i) {
                    localStorage.removeItem('kat')
                    this.$router.replace('Login')

                    let f = {
                        datos: null
                    }

                    let b = await axios.post(`http://${IP}:${PUERTO}/api/login/cerrarsesion`, f, this.$store.state.token)
                    console.log(b.data)
                }
            })
        },
        estado(){
            let info = this.$socket.connected
            console.log(info)
        },
        iniciando_conexion(){

            // SE INICIA LA CONEXION UNA VEZ ESTÉ LOGUEADO

            const options = {'forceNew':true }

            const t = JSON.parse(localStorage.getItem('kat'))
            const token = t != null ? t.token.headers.Authorization.split(' ')[1] : 'nada'

            const ioInstance = io(`http://${IP}:${PUERTO}/?token=${token}`, {
                reconnection: true,
                reconnectionDelay: 500,
                maxReconnectionAttempts: Infinity
            })


            Vue.use(VueSocketIOExt, ioInstance, {
                store, // vuex store instance
                actionPrefix: 'SOCKET_', // keep prefix in uppercase
                eventToActionTransformer: (actionName) => actionName // cancel camel case
            })

        },
        getVersion(){
            ipcRenderer.send('app_version')

            ipcRenderer.on('app_version', (event, args)=>{
                ipcRenderer.removeAllListeners('app_version')
                this.version = args.version
            })

            ipcRenderer.on('actualizacion', (event, message)=>{
                this.update = message
            })
        },
        pushversion(){
            ipcRenderer.send('ok_update')
        },
        ...mapActions(['descargar_datos', 'receptor'])
    },
    mounted() {
        
        this.iniciando_conexion()
        this.descargar_datos(this.$socket) // descarga los datos nuevos al iniciar app
        this.receptor() // esta funcion recibe la orden de actulizar un modulo en especifico y descarga los datos cuando haya nueva informacion disponible
        this.getVersion()
    },
}
</script>


<style>

    td{
        padding: 5px 5px;
    }

    .contenedor{
        width: 100%;
        height: 100vh;
        display: flex;
    }

        .asidex{
            position: relative;
            width: 50px;
            height: 100%;
            background-color: #252935;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-top: 14px;
        }
            .icono_menu_a{
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: .4s ease;
                /* margin-bottom: 14px; */
                color: white;
                cursor: pointer;
                
            }

            .btn_logout{
                position: absolute;
                bottom: 10px;
                left: 8px;
            }

        .seccion_a{
            width: calc(100% - 50px);
            height: 100%;
        }

            .top_verde{
                background-color: #49C466;
                width: 100%;
                height: 45px;
                border-bottom: 1px solid #2ab74a;
            }

            .seccion_b{
                width: 100%;
                height: calc( 100% - 45px);
                display: flex;
            }

                .sub_menu_a{
                    width: 200px;
                    height: 100%;
                    background-color: #ffffff;
                    border-right: 1px solid #e9e9e9;
                }
                
                .cuerpo_seccion_b{
                    width: calc(100% - 200px);
                    height: 100%;
                }

                    .top_cuerpo_seccion_b{
                        width: 100%;
                        height: 35px;
                        background-color: #fafafa;
                        border-bottom: 1px solid #e9e9e9;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 14px;
                    }

                    .cuerpo_sub_seccion_b{
                        width: 100%;
                        height: calc(100% - 35px);
                    }
                        .submenu_titulo{
                            font-size: 12px;
                            color: #808080;
                            padding-left: 15px;
                            margin-top: 15px;
                            margin-bottom: 8px;
                        }
                            .submenu_modulo{
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                height: 30px;
                                padding-left: 25px;
                                box-sizing: border-box;
                            }
                                .submenu_modulo_icon{
                                    width: 18px;
                                    height: 18px;
                                    margin-right: 5px;
                                    line-height: 0px;
                                }

                                .submenu_modulo_texto{
                                    font-size: 13px;
                                    color: #3c3c3c;
                                    width: 100%;
                                }


    /* BTN PARA ACTUALIZAR */

    .btn_actualizacion{
        width: 200px;
        height: 40px;
        background-color: #3993DD;
        color: white;
        position: fixed;
        bottom: 0;
        left: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        user-select: none;
        transition: .2s ease;
        cursor: pointer;
    }
        .btn_actualizacion:active{
            background-color: #F2A541;
        }

    .vversion{
        color: white;
        font-size: 15px;
        position: fixed;
        bottom: 50px;
        user-select: none;
    }

    /* CSS de modal */

    .contenedor_modal{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .cuerpo_modal{
            width: 700px;
            height: auto;
            background-color: white;
            padding-bottom: 20px;
        }
            .cabecera_modal{
                width: 100%;
                height: 40px;
                border-bottom: 1px solid #e9e9e9;
                display: flex;
                align-items: center;
                padding-right: 10px;
                flex-direction: row-reverse;
            }
</style>