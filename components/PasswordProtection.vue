<template>
  <main class="container">
    <b-form-group
      label="Password"
      label-for="password"
    >
      <b-form-input
        v-model="password"
        @input.native="authenticated = null"
        @keyup.enter="attemptAuthentication"
        id="password"
        :state="authenticated"
        type="password"
      />
    </b-form-group>

    <button
      @click="attemptAuthentication"
      class="btn btn-primary"
      type="button"
    >Enter</button>
  </main>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      password: '',
      authenticated: null,
    }
  },
  created () {
    const authenticated = Cookie.get('authenticated')
    if (authenticated) this.$emit('authenticate')
  },
  methods: {
    attemptAuthentication () {
      if (this.password === 'emit!niart'.split('').reverse().join('')) {
        this.authenticated = true
        this.$emit('authenticate')
      } else this.authenticated = false
    },
  },
}
</script>

<style scoped lang="scss">

</style>
