import Axios from "axios"


const instance = Axios.create({
  headers: {
    'Content-Type': 'application/json',
    'HTTP_X_KEY_INFLECTION': 'camel'
  }
})

export default instance