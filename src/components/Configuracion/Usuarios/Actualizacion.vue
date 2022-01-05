<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" @click="salir" size="sm">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <form @submit.prevent="actualizacion">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <label for="">Nombre</label>
                            <b-form-input type="text" v-model="nombre" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Usuario</label>
                            <b-form-input type="text" v-model="usuario" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Contraseña</label>
                            <b-form-input type="text" v-model="pass1" size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Repite Contraseña</label>
                            <b-form-input type="text" v-model="pass2" size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Tipo de usuario</label>
                            <select class="form-control form-control-sm" required v-model="tipo">
                                <option value="">Selecciona</option>
                                <option value="root">Root</option>
                                <option value="admin">Administrador</option>
                                <option value="usuario">Usuario</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Estado</label>
                            <select class="form-control form-control-sm" required v-model="bloqueo">
                                <option value="">Selecciona</option>
                                <option value="0">Activo</option>
                                <option value="1">Bloqueado</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" size="sm" variant="info">Guardar cambios</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { IP, PUERTO } from '@/config/parametros'
import { minix } from '@/components/functions/alertas'
import { mapActions } from 'vuex'

export default {
    name: 'ActualziarUsuario',
    props:['idu'],
    data() {
        return {
            nombre: '',
            usuario: '',
            pass1: '',
            pass2: '',
            tipo: '',
            bloqueo:'',
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        },
        async getdatos(){
            let i = await axios.get(`http://${IP}:${PUERTO}/api/usuarios/${this.idu}`, this.$store.state.token)
            this.nombre = i.data.nombre
            this.usuario = i.data.usuario
            this.tipo = i.data.tipo
            this.bloqueo = i.data.bloqueo
        },
        async actualizacion(){
            if (this.pass1 == '' && this.pass2 == '') {
                let f = {
                    api: 'usuarios',
                    id: this.idu,
                    pull: false,
                    formulario: {
                        nombre: this.nombre.toUpperCase(),
                        usuario: this.usuario,
                        tipo: this.tipo,
                        bloqueo: this.bloqueo
                    }
                }

                await this.updateData(f)
                await this.getdatos()

            }else{
                if(this.pass1 == '' || this.pass2 == ''){
                    minix({icon: 'info', mensaje: 'Para cambiar contraseña, debes ingresarla 2 veces', tiempo: 3000})
                }else{

                    if(this.pass1 == this.pass2){
                    
                        let f ={
                            api: 'usuarios',
                            id: this.idu,
                            pull: false,
                            formulario: {
                                nombre: this.nombre.toUpperCase(),
                                usuario: this.usuario,
                                pass: this.pass1,
                                tipo: this.tipo,
                                bloqueo: this.bloqueo
                            }
                        }

                        await this.updateData(f)
                        await this.getdatos()

                    }else{
                        minix({icon: 'info', mensaje: 'Los campos de contraseña no coinciden', tiempo: 3000})
                    }
                }
            }
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        this.getdatos()
    },
}
</script>

<style>

</style>