import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Home extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Página inicial</h1>
        <Link to="/my-videos">Meus Vídeos</Link>
        <Link to="/video/5">Ver Vídeo</Link>
      </div>
    )
  }
}

export default Home