import React, { Component } from 'react'
import { Link } from "react-router-dom"

class VideoManager extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Manager</h1>
        <Link to="/">Home</Link>
        <Link to="/video/2">Ver Vídeo</Link>
      </div>
    )
  }
}

export default VideoManager