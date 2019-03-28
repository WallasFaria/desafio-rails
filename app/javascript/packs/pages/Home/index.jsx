import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Button from '../../components/Button'

import './style.scss'

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="bg">
          <div className='container slide'>
            <i className="fa fa-video-camera"></i>
            <h1>Use nossa plataforma para disponibilizar seu vídeo na Internet</h1>
          </div>
        </div>

        <div className="container">
          <div className="content row">
            <Button
              isLink={true} to="/my-videos" type='action'
              className='btn-upload' iconName='cloud-upload'>
              Publique seu primeiro vídeo
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home