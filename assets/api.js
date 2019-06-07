import cachios from 'cachios'

// cachios.defaults.withCredentials = true

const base = () => `${window.location.origin}/api`
const api = {}

api.loadCars = () => cachios.get(`${base()}/cars`).then(({ data }) => data)
api.saveCar = car => cachios.post(`${base()}/cars`, car).then(({ data }) => data)
// api.saveCar = (carNumber, car) => cachios.put(`${base()}/cars/${carNumber}`, car).then(({ data }) => data)

export default api
