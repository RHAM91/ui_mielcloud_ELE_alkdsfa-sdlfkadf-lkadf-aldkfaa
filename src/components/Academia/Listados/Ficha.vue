<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                {{codigoa}} 
                <b-button type="button" variant="outline-danger" @click="cerrar" size="sm">Cerrar</b-button>
            </div>
            <div class="box-alumno">
                <b-container fluid>
                    <b-row>
                        <b-col sm="12" class="mt-4">
                            <div class="nombre">
                                Romario Isai Torres Marroquin
                            </div>
                        </b-col>
                        <b-col sm="6" class="mt-4">
                            <table >
                                
                                <tr>
                                    <td style="text-align: center;">
                                        <i class="fas fa-phone-alt"></i>
                                    </td>
                                    <td>
                                        12345678
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </td>
                                    <td>
                                        Ubicacion
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;">
                                        <i class="fas fa-at"></i>
                                    </td>
                                    <td>
                                        Correo
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;">
                                        <i class="fas fa-flag"></i>
                                    </td>
                                    <td>
                                        Pais
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;">
                                        <i class="fas fa-city"></i>
                                    </td>
                                    <td>
                                        Ciudad
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;">
                                        <i class="fas fa-guitar"></i>
                                    </td>
                                    <td>
                                        btn instrumentos
                                    </td>
                                </tr>
                            </table>
                        </b-col>

                        <b-col sm="6" class="mt-4">
                            <table >
                                <tr>
                                    <td style="text-align: center;">
                                        <i class="fas fa-user-tie"></i>
                                    </td>
                                    <td>
                                        Pastor
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;">
                                        <i class="fas fa-cross"></i>
                                    </td>
                                    <td>
                                        Iglesia
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;">
                                        <i class="fas fa-user"></i>
                                    </td>
                                    <td>
                                        Docente
                                    </td>
                                </tr>
                            </table>
                        </b-col>
                        
                        <b-col sm="12" class="mt-3">
                            <hr>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ficha',
    props:['codigoa'],
    data() {
        return {
            
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        }
    },
}
</script>

<style>
    .box-alumno{
        width: 100%;
        height: auto;
    }
        .nombre{
            text-align: center;
            font-size: 30px;
            font-weight: bold;
        }
</style>