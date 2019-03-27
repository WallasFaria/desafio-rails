import React, { Component } from 'react'
import './style.scss'

export default class Alert extends Component {
  componentDidMount() {
    setTimeout(this.hendleDismiss, 4000)
  }

  hendleDismiss = () => {
    this.props.onDismiss()
  }

  render() {
    const {text, type} = this.props

    return (
      <div className={`alert alert-${type || 'primary'} alert-dismissible fade show`} role="alert">
        {text}
        <button type="button" onClick={this.hendleDismiss} className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}

