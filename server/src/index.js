// meta setup
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import Car from './models/Car'

dotenv.config()

const {
  MONGODB_URI,
  NODE_ENV,
  PORT,
} = process.env

if (!MONGODB_URI) {
  console.error('MONGODB_URI must be specified')
  process.exit(1)
}

var app = express()
app.use(express.static(path.join(__dirname, '/dist/')))

app.use(cors({ origin: true }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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

// router setup
const router = express.Router()
router.get('/', (req, res) => res.json({ message: 'Hello, world!' }))

router
  .route('/cars')
  .get((req, res) => {
    Car.find((err, cars) => {
      if (err) res.status(500).send(err)
      else return res.json(cars)
    })
  })
  .post((req, res) => {
    const { carNumber, lines } = req.body

    if (!carNumber) res.status(400).send({ message: 'carNumber is a required parameter' })
    if (isNaN(+carNumber)) res.status(400).send({ message: 'carNumber must be a number' })
    if (!lines) res.status(400).send({ message: 'lines is a required parameter' })
    if (!Array.isArray(lines)) res.status(400).send({ message: 'lines must be an array' })

    Car.findById(`${carNumber}`, (err, car) => {
      if (err) return res.status(500).send(err)

      // new car
      else if (!car) {
        const car = new Car({
          carNumber: +carNumber,
          lines: lines.sort(),
        })

        car.save(err => {
          if (err) res.status(500).send(err)
          else {
            res.status(201)
            return res.json(car)
          }
        })
      }

      // car found
      else {
        const linesToAdd = lines.filter(line => !car.lines.includes(line))
        if (!linesToAdd.length) return res.json({})

        car.lines = [ ...car.lines, ...linesToAdd ].sort()

        car.save(err => {
          if (err) res.status(500).send(err)
          else return res.json(car)
        })
      }
    })
  })

router
  .route('/cars/:carNumber')
  .get((req, res) => {
    Car.findById(`${req.params.carNumber}`, (err, car) => {
      if (err) res.status(500).send(err)
      else return res.json(car)
    })
  })
  .put((req, res) => {
    Car.findById(`${req.params.carNumber}`, (err, car) => {
      if (err) res.status(500).send(err)
      else {
        const linesToAdd = req.body.lines.filter(line => !car.lines.includes(line))
        if (!linesToAdd.length) return res.json(car)

        car.lines = [ ...car.lines, ...linesToAdd ].sort()

        car.save(err => {
          if (err) res.status(500).send(err)
          else res.json(car)
        })
      }
    })
  })
  .delete((req, res) => {
    Car.findOneAndRemove({ _id: req.params.carNumber }, (err, car) => {
      if (err) res.status(500).send(err)
      else return res.json({})
    })
  })

app.use('/api', router)

if (NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '/../dist'), { extensions: [ 'html' ] }))
}

// start the server
const port = PORT || 80

app.listen(port, () => {
  console.log('express server listening on port ' + port)
})
