import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { apiVideos } from '../../../services/api'
import Button from '../../../components/Button'

const initialState = {
  video: {
    id: '',
    name: '',
    url: '',
  },
  mode: 'new',
  errors: {}
}

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    if (this.props.video) {
      const { id, name, url } = this.props.video
      this.setState({ video: { id, name, url }, mode: 'edit' })
    }
  }

  sendRequest = () => {
    switch(this.state.mode) {
      case 'new':
        return apiVideos.create(this.state.video)
      case 'edit':
        return apiVideos.update(this.state.video)
    }
  }

  hendleError = error => {
    if (error.response.status == 422) {
      const errors = error.response.data.errors
      this.setState({ errors })
    }
  }

  hendleSuccess = video => {
    this.setState({ videoSaved: video })
    this.props.onSave(video)
  }

  saveVideo = () => {
    this.sendRequest()
      .then(this.hendleSuccess)
      .catch(this.hendleError)
  }

  hendleChangeName = event => {
    const name = event.target.value
    this.setState({ video: { ...this.state.video, name } })
  }

  hendleChangeUrl = event => {
    const url = event.target.value
    this.setState({ video: { ...this.state.video, url } })
  }

  renderError = errors => (
    errors && <span className='message-error'>{errors.join(', ')}</span>
  )

  renderSuccess = () => {
    const video = this.state.videoSaved
    return (
      <div className="form success">
        <div className="message">
          O vídeo "{video.name}" foi salvo com sucesso!
        </div>
        <div className="actions">
          {this.props.showPrimaryAction &&
            <Button
              type='primary'
              iconName='arrow-right'
              to={`/video/${video.id}`}
              isLink={true}>
              Ver Vídeo
            </Button>}
          <Button type='light' onClick={this.props.onCancel}>Fechar</Button>
        </div>
      </div>
    )
  }

  render() {
    const { name, url } = this.state.video

    if (this.state.videoSaved) return this.renderSuccess()

    return (
      <div className='form'>

        <div className="form-group">
          <label>Nome</label>
          <input type="text"
            className={`form-control ${this.state.errors.name ? 'error' : ''}`}
            value={name}
            onChange={this.hendleChangeName}
            placeholder="Nome do vídeo" />
          {this.renderError(this.state.errors.name)}
        </div>

        <div className="form-group">
          <label>Url</label>
          <input type="text"
            className={`form-control ${this.state.errors.url ? 'error' : ''}`}
            value={url}
            onChange={this.hendleChangeUrl}
            placeholder="url do tipo .m3u8" />
          {this.renderError(this.state.errors.url)}
        </div>

        <div className="actions">
          <Button type='primary' onClick={this.saveVideo}>Salvar</Button>
          <Button type='light' onClick={this.props.onCancel}>Cancelar</Button>
        </div>

      </div>
    )
  }
}

Form.propTypes = {
  video: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  showPrimaryActionOnSeccess: PropTypes.bool
}

Form.defaultPropTypes = {
  showPrimaryActionOnSeccess: true
}

export default Form