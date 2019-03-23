import axios from "./axiosConnect"

const apiVideos = {
  getById(id) {
    return axios.get(`/videos/${id}`)
  },

  async getList() {
    try {
      return (await axios.get('/videos')).data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  delete(id) {

  },

  update({nome, url}) {

  },

  create({nome, url}) {

  }
}

export {
  apiVideos
}