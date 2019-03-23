import React, { Component } from 'react'

import VideoPlayer from '../../../components/VideoPlayer'
import LinkButton from '../../../components/Button'
import { apiVideos } from '../../../services/api'

import dateHelper from '../../../helpers/date'

import './style.scss'

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
      }
    }

    this.getVideo()
  }

  getVideo() {
    apiVideos.getById(this.props.match.params.id)
      .then(video => this.setState({ video }))
  }

  render() {
    const { name, url, totalViews, owner, createdAt } = this.state.video

    return (
      <div className='page-video'>
        <div className="video">
          <div className="container">
            <VideoPlayer source={url} width="930" />
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

          <div className='actions'>
            <LinkButton
              isLink={true} to="/my-videos" type='action'
              text="Publique um vídeo você também"
              className='btn-upload' iconName='cloud-upload' />
          </div>
        </div>
      </div>
    )
  }
}

export default VideoShow