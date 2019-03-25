import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

require('./style.scss')

class SidePanel extends Component {
  render() {
    const { title, children, visible, onClose } = this.props

    return (
      <Fragment>
        <div className={`overlay ${visible ? 'is-visible' : ''}`}></div>
        <div className={`side-panel ${visible ? 'is-visible' : ''}`}>
          <header>
            <h2 className='title'>{title}</h2>
            <Button type='light' iconName='close' onClick={() => onClose()}>fechar</Button>
          </header>

          <div className="body">
            { visible && children}
          </div>
        </div>
      </Fragment>
    )
  }
}

SidePanel.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SidePanel