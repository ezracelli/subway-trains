import axios from 'axios'

axios.defaults.withCredentials = true

const base = () => `${window.location.origin}/api`
const api = {}

api.loadCars = () => axios.get(`${base()}/cars`).then(({ data }) => data)
api.saveCar = car => axios.post(`${base()}/cars`, car).then(({ data }) => data)
// api.saveCar = (carNumber, car) => axios.put(`${base()}/cars/${carNumber}`, car).then(({ data }) => data)

export default api
