import Axios from "axios"
import { Redirect } from 'react-router-dom'

const instance = Axios.create({
  baseURL: 'http://localhost:3000',
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status == 401) {
    window.document.location.reload()
  }
  return Promise.reject(error)
});

export default instance