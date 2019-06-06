import mongoose from 'mongoose'
const Schema = mongoose.Schema

const car = new Schema({
  _id: {
    type: String,
    required: true,
  },
  carNumber: {
    type: Number,
    required: true,
  },
  lines: {
    type: [ String ],
    required: true,
  },
}, { _id: false })

car.pre('validate', function (next) {
  this._id = `${this.carNumber}`
  next()
})

export default mongoose.model('Car', car)
