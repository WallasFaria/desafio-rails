import React, { Component } from 'react'
import Pagination from 'react-js-pagination'

import ToolBar from './components/ToolBar'
import ListItem from './components/ListItem'
import Button from '../../../components/Button'
import SidePanel from '../../../components/SidePanel'
import Alert from '../../../components/Alert'
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
    edit: {},
    showForm: false,
    flashMessages: [],
  }

  componentDidMount() {
    this.getVideoList()
    if (this.props.location.state && this.props.location.state.flashMessage) {
      let flashMessages = this.state.flashMessages
      flashMessages.push(this.props.location.state.flashMessage)
      this.setState({ flashMessages })
    }
  }

  getVideoList = () => {
    apiVideos.getList(this.state.filters)
      .then(({data, pagination}) =>
        this.setState({ videos: data, pagination, edit: {} }))
  }

  handlePageChange = pageNumber => {
    const filters = { ...this.state.filters, page: pageNumber }
    this.setState({ filters }, this.getVideoList)
  }

  hendleEdit = video => {
    this.setState({ edit: { video }, showForm: true })
  }

  hendleDelete = video => {
    apiVideos.delete(video.id)
      .then(() => {
        const message = `Video "${video.name}" foi excluido!`
        this.setState({ flashMessages: [...this.state.flashMessages, message] })
        this.getVideoList()
      })
  }

  hendleCopy = () => {
    this.setState({ flashMessages: [...this.state.flashMessages, 'Link copiado'] })
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

  hendleClickNew = () => {
    this.setState({ showForm: true, edit: {} })
  }

  renderForm = () => (
    <SidePanel title={this.state.edit.video ? 'Editar' : 'Cadastrar Novo'}
      visible={this.state.showForm}
      onClose={() => this.setState({ showForm: false })}
    >
      <FormVideo
        onCancel={() => this.setState({ showForm: false })}
        onSave={this.getVideoList}
        {...this.state.edit}
      />
    </SidePanel>
  )

  removeFlashMessage = msg => {
    const flashMessages = this.state.flashMessages.filter(m => m != msg)
    this.setState({ flashMessages })
  }

  render() {
    const videos = this.state.videos

    return (
      <div className='container page-my-videos'>
        {this.renderForm()}

        {this.state.flashMessages.map((msg, i) =>
          <Alert key={i} text={msg} onDismiss={() => this.removeFlashMessage(msg)}/>
        )}

        <div className='top'>
          <h1 className='title'>Meus Vídeos</h1>

          <Button
            type='action'
            className='btn-upload'
            iconName='cloud-upload'
            onClick={this.hendleClickNew}>
            Publicar Vídeo
          </Button>
        </div>

        <ToolBar onSearch={this.hendleSearch} onSort={this.hendleSort} />

        <div className='video-list'>
          {videos.map(video =>
            <ListItem
              key={video.id}
              video={video}
              onCopy={this.hendleCopy}
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