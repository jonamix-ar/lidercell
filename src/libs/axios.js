import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default axios
