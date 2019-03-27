import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../../../../components/Button'
import dateHelper from '../../../../../helpers/date'

import './style.scss'

class ListItem extends Component {
  hendleClickCopy = () => {
    const copyText = window.document.querySelector(`.item-${this.props.video.id} .share-link input`)
    copyText.select()
    window.document.execCommand("copy")
    this.props.onCopy()
  }

  renderImage() {
    return this.props.video.image
      ? <img src={this.props.video.image} />
      : <div className="no-image"></div>
  }

  render() {
    const { video, onEdit, onDelete } = this.props

    return (
      <div className={`list-item item-${video.id}`}>
        <Link to={`/video/${video.id}`} className='video-image'>{this.renderImage()}</Link>

        <div className='info'>
          <Link to={`/video/${video.id}`} className="title">{video.name}</Link>
          <div className="views">{video.totalViews} Views</div>
          <div className="published-date">
            Publicado em {dateHelper.toLocate(video.createdAt)}
          </div>
          <div className="share-link">
            <span>Link do vídeo: </span>
            <input readOnly value={`${window.location.origin}/video/${video.id}`} />
          </div>
        </div>

        <div className="actions">
          <Button type='light' iconName='copy' onClick={this.hendleClickCopy} />
          <Button iconName='edit' type='light' title='Editar' onClick={() => onEdit(video)}/>
          <Button
            iconName='trash'
            type='light'
            confirm='Certeza que deseja excluir?'
            onClick={() => onDelete(video)}/>
        </div>
      </div>
    )
  }
}

export default ListItem

