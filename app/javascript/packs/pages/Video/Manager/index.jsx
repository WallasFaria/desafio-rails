import React, { Component } from 'react'
import Pagination from 'react-js-pagination'

import ToolBar from './components/ToolBar'
import ListItem from './components/ListItem'
import Button from '../../../components/Button'

import { apiVideos } from '../../../services/api'

import './style.scss'

var timeout = null

class VideoManager extends Component {
  state = {
    videos: [],
    pagination: {
      activePage: 0,
      itemsCountPerPage: 0,
      totalItemsCount: 0,
      pageRangeDisplayed: 5
    },
    filters: {
      query: '',
      sort: 'created_at',
      order: 'asc',
      page: 1
    }
  }

  componentDidMount() {
    this.getVideoList()
  }

  getVideoList = () => {
    apiVideos.getList(this.state.filters)
      .then(({data, pagination}) =>
        this.setState({ videos: data, pagination }))
  }

  handlePageChange = pageNumber => {
    const filters = { ...this.state.filters, page: pageNumber }
    this.setState({ filters }, this.getVideoList)
  }

  hendleEdit = video => {
    alert('editar ' + video.name)
  }

  hendleDelete = video => {
    alert('excluir ' + video.name)
  }

  hendleSearch = query => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      const filters = { ...this.state.filters, query }
      this.setState({ filters }, this.getVideoList)
    }, 200);
  }

  hendleSort = sortOrder => {
    const sort = sortOrder.split('-')[0]
    const order = sortOrder.split('-')[1]

    const filters = { ...this.state.filters, sort, order }

    this.setState({ filters }, this.getVideoList)
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

        <ToolBar onSearch={this.hendleSearch} onSort={this.hendleSort} />

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