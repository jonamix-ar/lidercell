import axios from 'axios'

const Api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default Api
