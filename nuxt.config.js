import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description', name: 'description', content: pkg.description,
      },
    ],
    link: [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico',
      },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [ '~/assets/styles/main' ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [ '~/plugins/api' ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
  ],

  styleResources: { scss: [ '~/assets/styles/mixins/_breakpoints.scss' ] },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },

  /*
  ** Axios module configuration
  ** See https://github.com/nuxt-community/axios-module#options
  */
  axios: {},

  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'bootstrap-vue',
      'vue-set',
      '@/plugins',
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
  },
}
