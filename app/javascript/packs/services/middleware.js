export default instance => {
  // hendleRequest(instance)
  hendleResponse(instance)
}

const currentUser = {
  id: null,
  name: null
}

var authenticityToken = ''

const hendleResponse = instance => {
  instance.interceptors.response.use(
    response => {
      setCurrentUser(response.headers)
      setAuthenticityToken(response.headers)
      return response
    },
    error => {
      checkUserLogined(error.response.status)
      return Promise.reject(error)
    }
  )
}

const checkUserLogined = status => {
  if (status == 401) window.document.location.reload()
}

const setCurrentUser = headers => {
  if (headers['current-user-id']) {
    currentUser.id = headers['current-user-id']
    currentUser.name = headers['current-user-name']
  }
}

const setAuthenticityToken = headers => {
  if (headers['authenticity-token']) {
    authenticityToken = headers['authenticity-token']
  }
}

export {
  currentUser,
  authenticityToken
}