import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {IP, PUERTO} from '@/config/parametros'
import VuexPersist from 'vuex-persist'
import { minix } from '../components/functions/alertas'


Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'kat',
    storage: window.localStorage,
    reducer: state => ({
  
      token: state.token,
      permisos: state.permisos,
      t2: state.t2,
      socket: '',
      formulario_inscripcion: state.formulario_inscripcion

    }) 
  })
  

// FUNCIONES AUXILIARES

function filtrar_acentos(input){
    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < acentos.length; i++) {
        input = input.replace(acentos.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input;
}

function f_dnsPastor(arr, state){
    console.log(arr)
    var dns = state.filter(pastor => pastor.nombre.toLowerCase() == arr)
    //var codPastor = `${dns[0].ci}-${dns[0].id}`
    console.log(dns)
    return 'lika'

}


// FIN DE LAS FUNCIONES AUXILIARES

export default new Vuex.Store({
  state: {
    //-----> sistema
      token: '',
      t2: '',
      permisos:  [],
      loading_icono: false,
      rutas:[
        {api:'paises', set: 'set_paises'},
        {api:'iglesias', set: 'set_iglesias'},
        //{api: 'miembros', set: 'set_miembros'},
        {api:'ingresos', set: 'set_ingresos'},
      ],

    //-----> produccion
      formulario_inscripcion: [],  

      
      paises: [],
      //miembros: [],
      ingresos: [],
      iglesias: [], // se colocó esta aqui porque como el getter es un async no lo puede leer correctamente el ...mapgetters y no hace el recorrido correspondiente
      filtro_busqueda: '',

    //----> filtros

    filtros:{
        filtro_alumno: ''
    }

  },
  mutations: {
    //------> SISTEMA
    set_token(state, token){
        let token_formateado = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        state.token = token_formateado
    },
    set_socket(state, socket){
        state.socket = socket
    },
    
    // ------> PRODUCCION

    set_ciudades(state, data){
        state.ciudades = data
    },
    set_paises(state, data){
        state.paises = data
    },
    set_cursos(state, data){
        state.cursos = data
    },
    set_docentes(state, data){
        state.docentes = data
    },
    set_iglesias(state, data){
        state.iglesias = data
    },
    set_formulario_inscripcion(state, data){
        state.formulario_inscripcion = data
    },
    // set_miembros(state, data){
    //     state.miembros = data
    // },
    set_ingresos(state, data){
        state.ingresos = data
    },
    set_tipo_de_filtrado(state, data){
        state.filtro_busqueda = data
    },
    set_loading(state, data){
        state.loading_icono = data
    },

    //------> FILTROS

    set_filtro_alumnos(state, query){
        state.filtros.filtro_alumno = query
    },

  },
  actions: {
    get_token({commit}, data){
        commit('set_token', data)
    },
    async saveData({commit, state, dispatch}, data){
        try {
            const r = await axios.post(`http://${IP}:${PUERTO}/api/${data.api}`, data.formulario, state.token)

            commit('set_loading', true)

            if (r.status == 200) {

                minix({icon: 'success', mensaje: r.data.message, tiempo: 3000})
                
                if (data.pull == true) {
                    dispatch('notificacion', data.api)
                }

                commit('set_loading', false)

            }else{
                minix({icon: 'info', mensaje: r.data.message, tiempo: 6000})
                commit('set_loading', false)
                return 'YE'
            }
        } catch (e) {
            console.log(e)
            minix({icon: 'info', mensaje: e, tiempo: 3000})
        }
    },
    async deleteData({commit, state, dispatch}, data){
        try {

            commit('set_loading', true)
            
            const r = await axios.delete(`http://${IP}:${PUERTO}/api/${data.api}/${data.id}`, state.token)

            if(r.status == 200){
                minix({icon: 'success', mensaje: r.data.message, tiempo: 3000})

                if(data.pull == true){
                    dispatch('notificacion', data.api)
                }

                commit('set_loading', false)

            }else{
                minix({icon: 'info', mensaje: r.data.message, tiempo: 3000})
                commit('set_loading', false)
            }

        } catch (e) {
            console.log(e)
            minix({icon: 'info', mensaje: e, tiempo: 3000})
        }
    },
    async updateData({commit, state, dispatch}, data){

        try {
            
            commit('set_loading', true)

            const r = await axios.put(`http://${IP}:${PUERTO}/api/${data.api}/${data.id}`, data.formulario, state.token)

            if (r.status == 200) {
                minix({icon: 'success', mensaje: r.data.message, tiempo: 3000})

                if(data.pull == true){
                    dispatch('notificacion', data.api)
                }

                commit('set_loading', false)
            }else{
                minix({icon: 'info', mensaje: r.data.message, tiempo: 3000})
                commit('set_loading', false)
            }

        } catch (e) {
            console.log(e)
            minix({icon: 'info', mensaje: e, tiempo: 3000})
        }

    },
    async ejecutar_ruta({commit, state}, data){

      try {

            commit('set_loading', true)

            const datos = await axios.get(`http://${IP}:${PUERTO}/api/${data.api}`, state.token)
            commit(data.set, datos.data)

            if (datos.status == 200) {
                commit('set_loading', false)
            }

      } catch (e) {

            console.log(e)

      }

    },
    notificacion({state}, modulo){ // al guardar, actualizar u borrar envia señal para que todos los clientes actualicen

        let bits = {
            modulo
        }

        state.socket.client.emit('news', bits)
    },
    async receptor({state, dispatch}){ // recibe la orden de que modulo actualizar, descarga los datos nuevos
        state.socket.client.on('modulo', (mod)=>{

            let filtro = state.rutas.filter(ruta => ruta.api == mod)
            
            let data = {
                api: filtro[0].api,
                set: filtro[0].set
            }


            dispatch('ejecutar_ruta', data)
        })
    },
    async descargar_datos({commit, state, dispatch}, socket){ // Descarga todos los datos predefinios al iniciar la app

        commit('set_socket', socket)

        socket.client.on('inicializacion', (dat) =>{

            console.log(dat)

            for (let i = 0; i < state.rutas.length; i++) {

                const e = state.rutas[i];

                dispatch('ejecutar_ruta', e)

            }
        })
    },
    async dnsIglesias({commit, state}){ // se colocó esta funcion aqui debido que un getter no acepta que sea asincrono por lo tanto para hacer dns de iglesias sin usar sockets era necseario hacer asi
        let nar = []

        let pastores = await axios.get(`http://${IP}:${PUERTO}/api/pastores`, state.token)
        let iglesias = await axios.get(`http://${IP}:${PUERTO}/api/iglesias`, state.token)

        if (iglesias.data.length == 0) {
            return nar
        }else{
            for (let i = 0; i < iglesias.data.length; i++) {
                const e = iglesias.data[i];
                
                let s = e.pastor.split('-')
                let a = pastores.data.filter(pastor => pastor.ci == s[0] && pastor.id == s[1])

                let i = {
                    ci: e.ci,
                    iglesia: e.iglesia,
                    pastor: a[0].nombre,
                    id: e.id
                }

                nar.push(i)

            }

            commit('set_iglesias', nar)
        }
    }

  },
  getters:{

    filtro_busqueda_alumnos(state){

        if (state.filtros.filtro_alumno.length > 2) {

            switch (state.filtro_busqueda) {
                case 'alumno':
                    
                    var parametro = state.filtros.filtro_alumno

                    var x = parametro.split(' ')
                    var regex = "^(?=.*\\b" + x.join("\\b)(?=.*\\b") + "\\b)"
        
                    var filtro = state.alumnos.filter(alumno => filtrar_acentos(alumno.nombre.toLowerCase()).match(regex))
        
                    return filtro

                    break;
                
                case 'pastor':

                    var parametro = state.filtros.filtro_alumno
        
                    var filtro = state.alumnos.filter(alumno => alumno.pastor.toLowerCase() == parametro)
        
                    return filtro

                    break;

                case 'iglesia':

                    var parametro = state.filtros.filtro_alumno
                    var filtro = state.alumnos.filter(iglesia => iglesia.iglesia.toLowerCase() == parametro)

                    return filtro

                    break;

                case 'codigo':

                    var parametro = state.filtros.filtro_alumno
                    var filtro = state.alumnos.filter(alumno => alumno.codigo.toLowerCase() == parametro)

                    return filtro

                    break;

                case 'telefono':

                    var parametro = state.filtros.filtro_alumno
                    var filtro = state.alumnos.filter(alumno => alumno.telefono == parametro)

                    return filtro

                    break;

                default:

                    

                    break;
            }

        }else{
            return state.alumnos
        }

    },

    dnsCities(state){

        let nar = []

        if (state.ciudades == 'NO HAY REGISTROS') {
            return nar
        }else{

            for (let i = 0; i < state.ciudades.length; i++) {
                const e = state.ciudades[i];
                
                let s = e.pais.split('-')
                let a = state.paises.filter(pais => pais.ci == s[0] && pais.id == s[1])
    
                let i = {
                    ci: e.ci,
                    ciudad: e.ciudad,
                    id: e.id,
                    pais: a[0].pais,
                    cipais: e.pais
                }
    
                nar.push(i)
                
            }

            return nar
        }
    }
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
