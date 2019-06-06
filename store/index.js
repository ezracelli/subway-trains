import Vue from 'vue'
import Cookie from 'js-cookie'
import set from 'vue-set'
import { get } from 'lodash'

import api from '~/assets/api'

export const state = () => ({
  authenticated: false,
  cars: null,
})

export const mutations = {
  authenticate (state) {
    Vue.set(state, 'authenticated', true)
  },
  setCars (state, cars) {
    Vue.set(state, 'cars', cars)
  },
  setCar (state, car) {
    set(state.cars, car.carNumber, car.lines, Vue.set)
  },
}

export const actions = {
  authenticate: ({ commit }) => {
    Cookie.set('authenticated', true, { expires: 7 })
    commit('authenticate')
  },
  async loadCars ({ commit }) {
    commit('setCars', Symbol.for('loading'))

    try {
      let cars = await api.loadCars()
      if (!Array.isArray(cars)) throw Error('cars is not array')

      cars = cars.sort(({ _id: a }, { _id: b }) => a - b)

      const carsObj = {}
      cars.forEach(({ carNumber, lines }) => (carsObj[carNumber] = lines))

      return commit('setCars', carsObj)
    } catch (err) {
      return commit('setCars', null)
    }
  },
  async saveCar ({ commit, dispatch, getters }, car) {
    try {
      if (!getters.cars) await dispatch('loadCars')
      return api.saveCar(car).then(car => commit('setCar', car))
    } catch (err) {
      return console.log(err)
    }
  },
}

export const getters = {
  cars: state => state.cars,
  car: state => carNumber => get(state, [ 'cars', carNumber ], []),

  lines: (state, getters) => {
    // get sorted array of unique line numbers present
    const linesArr = Object.values(state.cars || {})
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort()

    const cars = Object.keys(state.cars || {})
    const linesObj = {}

    // get carNumbers for each above line
    linesArr.forEach(line => {
      linesObj[line] = cars.filter(carNumber => getters.car(carNumber).includes(line))
    })

    return linesObj
  },
}
