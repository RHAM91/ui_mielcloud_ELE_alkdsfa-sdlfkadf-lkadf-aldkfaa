<template>
    <div v-if="loading_icono" class="icoLoading">
        <img src="@/assets/fbb.gif" style="width: 100%;" alt="">
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Loading',
    computed:{
        ...mapState(['loading_icono'])
    },
}
</script>

<style>
    .icoLoading{
        width: 48px;
        height: 48px;
        position: fixed;
        top: 0;
        right: 11px;
        z-index: 999;
    }
</style>