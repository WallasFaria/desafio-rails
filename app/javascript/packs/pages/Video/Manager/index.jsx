import React, { Component } from 'react'

import ToolBar from './components/ToolBar'
import ListItem from './components/ListItem'
import Pagination from '../../../components/Pagination'
import Button from '../../../components/Button'

import { apiVideos } from '../../../services/api'

import './style.scss'

class VideoManager extends Component {
  state = {
    videos: []
  }

  componentDidMount() {
    this.getVideoList()
  }

  async getVideoList() {
    apiVideos.getList().then(videos => this.setState({ videos }))
  }

  hendleEdit = video => {
    alert('editar ' + video.name)
  }

  hendleDelete = video => {
    alert('excluir ' + video.name)
  }

  render() {
    const videos = this.state.videos

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
          {videos.map(video =>
            <ListItem
              key={video.id}
              video={video}
              onDelete={this.hendleDelete}
              onEdit={this.hendleEdit} />)}
        </div>

        <Pagination />
      </div>
    )
  }
}

export default VideoManager