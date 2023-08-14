import axios from 'axios'

const api = axios.create({
    baseURL: 'kanboom-backend-production.up.railway.app',
    timeout: 5000
})

export default api
