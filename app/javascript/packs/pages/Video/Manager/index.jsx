import React, { Component } from 'react'
import Pagination from 'react-js-pagination'

import ToolBar from './components/ToolBar'
import ListItem from './components/ListItem'
import Button from '../../../components/Button'

import { apiVideos } from '../../../services/api'

import './style.scss'

class VideoManager extends Component {
  state = {
    videos: [],
    pagination: {
      activePage: 0,
      itemsCountPerPage: 0,
      totalItemsCount: 0,
      pageRangeDisplayed: 5
    }
  }

  componentDidMount() {
    this.getVideoList()
  }

  getVideoList(pageNumber = 1) {
    const params = { page: pageNumber }

    apiVideos.getList(params)
      .then(({data, pagination}) =>
        this.setState({ videos: data, pagination }))
  }

  handlePageChange = pageNumber => {
    this.getVideoList(pageNumber)
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

        <nav className='nav-navigation'>
          <Pagination
            {...this.state.pagination}
            onChange={this.handlePageChange}
            itemClass='page-item'
            linkClass='page-link'
          />
        </nav>
      </div>
    )
  }
}

export default VideoManager