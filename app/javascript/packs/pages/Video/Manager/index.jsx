import React, { Component } from 'react'
import { Link } from "react-router-dom"

import ToolBar from './components/ToolBar'
import ListItem from './components/ListItem'
import Pagination from '../../../components/Pagination'
import Button from '../../../components/Button'

import './style.scss'

class VideoManager extends Component {
  render() {
    return (
      <div className='container page-my-videos'>
        <div className='top'>
          <h1 className='title'>Meus Vídeos</h1>

          <Button
            type='action'
            text="Publicar Vídeo"
            className='btn-upload' iconName='cloud-upload' />
        </div>

        <ToolBar />

        <div className='video-list'>

        </div>
      </div>
    )
  }
}

export default VideoManager