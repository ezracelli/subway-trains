import Vue from 'vue'
import $api from '~/assets/api'

export default function api () {
  Vue.prototype.$api = $api
}
