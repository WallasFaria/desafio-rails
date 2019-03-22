import React, { Component } from 'react'

import VideoPlayer from '../../../components/VideoPlayer'
import LinkButton from '../../../components/Button'

import './style.scss'

class VideoShow extends Component {
  state = {
    video: {
      name: 'A importancia do ciclismo no dia-a-dia',
      url: 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8',
      total_views: 15,
      created_at: '27/02/2019',
      owner: 'Wallas Faria'
    }
  }

  render() {
    const { name, url, total_views, owner, created_at } = this.state.video
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
                  <span className='owner'>{owner}</span>
                  <em className='published-date'> em {created_at}</em>
                </div>
              </div>
            </div>
            <div className='views'>
              <strong>{total_views}</strong>
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