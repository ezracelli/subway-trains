import pkg from './package'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

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

  workbox: { config: { debug: true } },

  manifest: {
    backgroundColor: 'white',
    display: 'fullscreen',
    lang: 'en-US',
    name: 'Subway Trains',
    shortName: 'Trains',
    themeColor: 'white',
  },

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
      'bootstrap-vue/nuxt',
      'vue-set',
      '@/plugins',
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
  },

  /*
  ** Server middleware configuration
  */
  serverMiddleware: [ '~/server/dist/index.js' ],

  /*
  ** Hooks configuration
  */
  hooks: {
    listen () {
      const { MONGODB_URI } = process.env

      if (!MONGODB_URI) {
        console.error('MONGODB_URI must be specified')
        process.exit(1)
      }

      mongoose
        .connect(
          MONGODB_URI,
          { useFindAndModify: false, useNewUrlParser: true }
        )
        .then(() => console.log('connection to database established'))
        .catch(err => {
          console.log(err)
          process.exit(1)
        })
    },
  },

}
