import React, { Component, Fragment } from 'react'

import VideoPlayer from '../../components/VideoPlayer'
import Button from '../../components/Button'
import SidePanel from '../../components/SidePanel'
import FormVideo from './components/Form'
import { apiVideos } from '../../services/api'
import { currentUser } from '../../services/middleware'

import dateHelper from '../../helpers/date'

class VideoShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      video: {
        name: '',
        url: '',
        totalViews: '',
        createdAt: '',
        owner: {
          id: null,
          name: ''
        }
      },
      showForm: false,
      startedVideo: false,
      txtTooltipCopy: 'Copiar Link do vídeo'
    }

    this.getVideo()
  }

  getVideo() {
    apiVideos.getById(this.props.match.params.id)
      .then(video => this.setState({ video }))
  }

  hendleClickRemove = () => {
    apiVideos.delete(this.state.video.id)
    .then(() => {
      const flashMessage = `Vídeo "${this.state.video.name}" foi excluído!`
      this.props.history.push('/my-videos', { flashMessage })
    })
  }

  hendleClickCopy = () => {
    const copyText = window.document.querySelector('.share-link input')
    copyText.select()
    window.document.execCommand("copy")
    this.setState({ txtTooltipCopy: 'Link Copiado' });
  }

  renderForm = () => {
    if (!currentUser.isLoggedIn()) return false
    return (
      <SidePanel title='Editar'
        visible={this.state.showForm}
        onClose={() => this.setState({ showForm: false })}
      >
        <FormVideo
          onCancel={() => this.setState({ showForm: false })}
          onSave={() => this.getVideo()}
          showPrimaryAction={false}
          video={this.state.video}
        />
      </SidePanel>
    )
  }

  renderLoggedActions = () => (
    <div>
      <div className='col-sm-6'>
        <Button type='light' iconName='edit'
          onClick={() => this.setState({ showForm: true })}>
          Editar
        </Button>
        <Button type='light' iconName='trash'
          onClick={this.hendleClickRemove}
          confirm='Certeza que deseja excluir?'>
          Excluir
        </Button>
      </div>
      <div className='col-sm-6'>
        <Button type='light' iconName='copy' onClick={this.hendleClickCopy}
          data-toggle="tooltip" data-placement="top" title={this.state.txtTooltipCopy}>
          Copiar Link
        </Button>
        <Button isLink={true} to='/my-videos' type='light' iconName='arrow-left' onClick={this.hendleClickGoBack}>
          Voltar para meus vídeos
        </Button>
      </div>
    </div>
  )

  renderNotLoggedActions = () => (
    <Button
      isLink={true} to="/my-videos" type='action'
      className='btn-upload' iconName='cloud-upload'>
      Publique um vídeo você também
    </Button>
  )

  hendlePlay = () => {
    if (!this.state.startedVideo) {
      this.setState({ startedVideo: true })
      apiVideos.addView(this.state.video.id)
    }
  }

  userOwnsTheVideo = () => {
    return currentUser.isLoggedIn() && this.state.video.owner.id == currentUser.id
  }

  renderActions = () => {
    if (!this.state.video.url) return null
    return this.userOwnsTheVideo()
      ? this.renderLoggedActions()
      : this.renderNotLoggedActions()
  }

  render() {
    const { name, url, totalViews, owner, createdAt } = this.state.video

    return (
      <div className='page-video'>
        { this.renderForm() }
        <div className="video">
          <div className="container">
            <VideoPlayer onPlay={this.hendlePlay} source={url} width="930" />
          </div>
        </div>

        <div className="container">
          <div className="bar-info">
            <div>
              <h1 className='title'>{name}</h1>
              <div className='details'>
                <small>Publicado por</small>
                <div>
                  <span className='owner'>{owner.name}</span>
                  <em className='published-date'> em {dateHelper.toLocate(createdAt)}</em>
                </div>
              </div>
            </div>
            <div className='views'>
              <strong>{totalViews}</strong>
              <small>views</small>
            </div>
          </div>

          <div className={`actions row ${this.userOwnsTheVideo() ? 'is-logged-in' : ''}`}>
            {this.renderActions()}

            {this.userOwnsTheVideo() && (
              <div className="share-link">
                <span>Link do vídeo</span>
                <input readOnly
                  value={`${window.location.origin}/video/${this.state.video.id}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default VideoShow