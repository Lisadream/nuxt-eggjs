import Vue from 'vue'
import Vuex from 'vuex'
import { http } from '../plugins/axios'
Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    namespaced: true,
    state: {
      counter: 0,
      token: ''
    },
    mutations: {
      SET_TOKEN(state, token) {
        state.token = token
      }
    },
    actions: {
      login: async ({ state, commit }, data) => {
        let ret = await http.post('/user/login', data)
        //   登录返回token
        commit('SET_TOKEN', ret.data.token)
        console.log('action data', data)
      }
    }
  })
export default store
