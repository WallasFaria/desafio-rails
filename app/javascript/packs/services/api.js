import axios from "./axiosConnect"
import middleware, { authenticityToken } from './middleware'

middleware(axios)

const apiVideos = {
  async getById(id) {
    try {
      return (await axios.get(`/videos/${id}`)).data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async getList({query, sort, order, page}) {
    const params = {q: query, sort, order, page, orderBy: 'teste'}

    try {
      return (await axios.get('/videos', { params })).data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  delete(id) {
    return axios.delete(`videos/${id}`)
  },

  async update({id, name, url}) {
    const data = {name, url, authenticityToken}
    try {
      return (await axios.put(`/videos/${id}`, data)).data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async create({name, url}) {
    try {
      return (await axios.post(`/videos`, {name, url, authenticityToken})).data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export {
  apiVideos
}