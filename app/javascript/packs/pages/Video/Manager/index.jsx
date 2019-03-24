import React, { Component } from 'react'
import Pagination from 'react-js-pagination'

import ToolBar from './components/ToolBar'
import ListItem from './components/ListItem'
import Button from '../../../components/Button'
import SidePanel from '../../../components/SidePanel'
import FormVideo from '../components/Form'

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
      order: 'desc',
      page: 1
    },
    showForm: false
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

  renderForm = () => (
    <SidePanel title='Novo Video'
      visible={this.state.showForm}
      onClose={() => this.setState({ showForm: false })}
    >
      <FormVideo
        onCancel={() => this.setState({ showForm: false })}
        onSave={this.getVideoList}
      />
    </SidePanel>
  )

  render() {
    const videos = this.state.videos

    return (
      <div className='container page-my-videos'>
        {this.renderForm()}
        <div className='top'>
          <h1 className='title'>Meus Vídeos</h1>

          <Button
            type='action'
            className='btn-upload'
            iconName='cloud-upload'
            onClick={() => this.setState({ showForm: true })}>
            Publicar Vídeo
          </Button>
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