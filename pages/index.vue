<template>
  <div>
    <Header />

    <password-protection
      v-if="!authenticated"
      v-on="{ authenticate }"
    />

    <main v-else class="container">
      <train-form />

      <train-data v-if="carsLoaded" />
      <div
        v-else
        class="text-center"
      >
        <button
          v-if="carsLoaded === null"
          @click="loadCars"
          class="btn btn-secondary"
          type="button"
        >
          <i class="icon-download"></i>
          Download existing data
        </button>

        <button
          v-else-if="carsLoaded === false"
          class="btn disabled"
        >
          <i class="icon-spinner2"></i>
          <span>Downloading...</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Header from '@/components/Header'
import PasswordProtection from '@/components/PasswordProtection'
import TrainForm from '@/components/TrainForm'
import TrainData from '@/components/TrainData'

export default {
  components: {
    Header,
    PasswordProtection,
    TrainForm,
    TrainData,
  },
  computed: {
    ...mapState([ 'cars', 'authenticated' ]),
    carsLoaded () {
      return this.cars === null ? null : this.cars !== Symbol.for('loading')
    },
  },
  methods: mapActions([ 'loadCars', 'authenticate' ]),
}
</script>

<style scoped lang="scss">
</style>
