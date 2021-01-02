import React, { Component } from 'react'
import PropTypes from 'prop-types'

import videojs from 'video.js'

window.videojs = videojs

require('videojs-contrib-hls/dist/videojs-contrib-hls')
require('videojs-contrib-quality-levels/dist/videojs-contrib-quality-levels.js')
import videojsqualityselector from 'videojs-hls-quality-selector' 

class VideoPlayer extends Component {

  settingVideo = (video) => {
    if (video) {
      const player = videojs(video)
      player.hlsQualitySelector = videojsqualityselector;
      player.hlsQualitySelector()

      if (typeof this.props.onPlay === 'function') {
        player.on('play', this.props.onPlay)
      }
    }
  }

  componentWillUnmount() {
    const player = videojs('main-player')
    if (player) player.dispose()
  }

  componentDidUpdate() {
    videojs('main-player').src(this.props.source)
  }

  shouldComponentUpdate(props) {
    return this.props.source != props.source
  }

  render() {
    const { source, type, ...dimentions } = this.props
    if (!source) return null

    return (
      <video ref={this.settingVideo} id='main-player' data-setup='{"fluid": true}' className="video-js vjs-default-skin" {...dimentions} controls>
        <source src={source} type={type || 'application/x-mpegURL'} />
      </video>
    )
  }
}

VideoPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  type: PropTypes.string,
  width: PropTypes.string.isRequired,
  heigth: PropTypes.string,
  onPlay: PropTypes.func
}

export default VideoPlayer