import Vue from 'vue'
import axios from 'axios'

const service = axios.create({
  timeout: 5000,
  // 所有用axios发出的请求都带个/api
  baseURL: '/api'
})
// @ todo拦截器管理token
Vue.prototype.$http = service
