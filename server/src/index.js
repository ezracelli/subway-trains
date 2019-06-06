// meta setup
import express from 'express'
import bodyParser from 'body-parser'
import router from './router'

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(router)

export default {
  path: '/api',
  prefix: false,
  handler: app,
}
