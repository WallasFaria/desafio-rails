import React, { Component } from 'react'
import PropTypes from 'prop-types'

import videojs from 'video.js'

require('video.js/dist/video-js.css')
window.videojs = videojs

require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
require('videojs-contrib-quality-levels/dist/videojs-contrib-quality-levels.js')
require('videojs-hls-quality-selector/dist/videojs-hls-quality-selector.js')
require('./style.css')

class VideoPlayer extends Component {

  settingVideo(video) {
    if (video) {
      const player = videojs(video)
      player.hlsQualitySelector()
    }
  }

  render() {
    const { source, type, ...dimentions } = this.props

    return (
      <video ref={this.settingVideo} className="video-js vjs-default-skin" {...dimentions} controls>
        <source src={source} type={type || 'application/x-mpegURL'} />
      </video>
    )
  }
}

VideoPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  type: PropTypes.string,
  width: PropTypes.string.isRequired,
  heigth: PropTypes.string
}

export default VideoPlayer