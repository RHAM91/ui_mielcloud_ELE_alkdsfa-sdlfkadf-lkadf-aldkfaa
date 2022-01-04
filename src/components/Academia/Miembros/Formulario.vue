<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h2>
                    Lista
                </h2>
            </b-col>
            <b-col sm="10" class="mt-4">
                <label for="">Buscar</label>
                <b-form-input type="text" size="sm" placeholder="Escribe un nombre para búscar"></b-form-input>
            </b-col>
            <b-col sm="2" class="mt-4">
                <b-button type="button" block variant="danger" size="sm" style="margin-top: 31px;">Buscar</b-button>
            </b-col>
            <b-col sm="12" class="mt-4">
                <table class="table table-striped table-bordered" style="font-size: 14px;">
                    <thead>
                        <tr>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
        

        <div class="btn_flotante" @click="modalFicha">
            <i class="fas fa-list"></i>
        </div>

        <Fichas v-if="modal" v-on:cerrar="modalFicha" />

    </b-container>
</template>

<script>

import Fichas from './Fichas.vue'

export default {
    name: 'Ingresos',
    components:{
        Fichas
    },
    data() {
        return {
            
            modal: false
        }
    },
    methods: {
        
        modalFicha(){
            this.modal = !this.modal
        }
    },
    mounted() {
        
    },
}
</script>

<style>
    .btn_flotante{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: absolute;
        bottom: 20px;
        right: 20px;
        background-color: #2C8C99;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
        transition: .3s ease-in-out;
    }
        .btn_flotante:active{
            background-color: #28464B;
        }
</style>