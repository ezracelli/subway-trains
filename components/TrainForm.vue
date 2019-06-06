<template>
  <form @submit="false" class="mt-3 mb-5">
    <div class="row justify-content-center">
      <b-form-group
        v-for="(key, index) in Object.keys(data)"
        :class="index ? 'col-5 col-md-3 col-xl-2' : 'col-7 col-md-5 col-xl-3'"
        :key="key"
        :label="key | decamelize"
        :label-for="key"
      >
        <b-form-input
          v-model="data[key]"
          @input.native="mask($event, key, index)"
          :disabled="saving"
          :maxlength="index ? 1 : ''"
          :state="validData[key]"
          :type="index ? 'text' : 'number'"
        />
      </b-form-group>

      <b-form-group class="col-12 col-md-4 col-lg-2">
        <button
          @click="saveCar(dataForSubmit)"
          class="btn btn-block"
          :class="readyForSubmit && !saving ? 'btn-primary' : 'disabled'"
          :disabled="!readyForSubmit || saving"
          type="button"
        >
          <i v-show="saving" class="icon-spinner2"></i>
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
      </b-form-group>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      trains: /[1-7]|[A-G]|J|[L-N]|[Q-S]|W|Z/,
      saving: false,
      data: {
        carNumber: '',
        line: '',
      },
    }
  },
  computed: {
    validData () {
      const { carNumber, line } = this.data
      return {
        carNumber: carNumber.length >= 4 ? /\d{4}/.test(carNumber) : null,
        line: line.length ? this.trains.test(line) : null,
      }
    },
    readyForSubmit () {
      let validKeys = Object.values(this.validData)
      return !validKeys.includes(false) && !validKeys.includes(null)
    },
    dataForSubmit () {
      if (!this.readyForSubmit) return null

      const { carNumber, line } = this.data
      return { carNumber, lines: [ isNaN(+line) ? line.toLowerCase() : +line ] }
    },
  },
  filters: {
    decamelize (string) {
      return string.replace(/[A-Z]/g, m => ` ${m.toLowerCase()}`)
    },
  },
  methods: {
    saveCar () {
      this.saving = true

      this.$store.dispatch('saveCar', this.dataForSubmit).then(() => {
        this.saving = false

        this.data.carNumber = ''
        this.data.line = ''
      })
    },
    mask (event, key, index) {
      let value = this.data[key]

      if (index) this.data[key] = value.toUpperCase()
      else this.data[key] = value.replace('e', '').slice(0, 4)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixins/breakpoints';

.form-group {
  position: relative;

  @include media-breakpoint-up('md') {
    button {
      bottom: 0;
      position: absolute;
    }
  }

  /deep/ label {
    text-transform: capitalize;
  }
}
</style>
