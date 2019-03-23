import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../../../../components/Button'
import dateHelper from '../../../../../helpers/date'

import './style.scss'

class ListItem extends Component {
  renderImage() {
    return this.props.video.image
      ? <img src={this.props.video.image} />
      : <div className="no-image"></div>
  }

  render() {
    const { video, onEdit, onDelete } = this.props

    return (
      <div className='list-item'>
        <Link to={`/video/${video.id}`} className='video-image'>{this.renderImage()}</Link>

        <div className='info'>
          <Link to={`/video/${video.id}`} className="title">{video.name}</Link>
          <div className="published-date">
            Publicado em {dateHelper.toLocate(video.createdAt)}
          </div>
          <div className="views">{video.totalViews} Views</div>
        </div>

        <div className="actions">
          <Button iconName='edit' type='light' title='Editar' onClick={() => onEdit(video)}/>
          <Button iconName='trash' type='light' title='Excluir' onClick={() => onDelete(video)}/>
        </div>
      </div>
    )
  }
}

export default ListItem

