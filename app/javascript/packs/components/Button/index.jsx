import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './style.scss'

class Button extends Component {
  state = {
    showConfirm: false
  }

  setTooltip = element => {
    this.element = element
    if (this.props['data-toggle'] == 'tooltip') {
      window.$(element).tooltip()
    }
  }

  componentDidUpdate() {
    if (this.props['data-toggle'] == 'tooltip') {
      window.$(this.element)
        .tooltip('hide')
        .attr('data-original-title', this.props.title)
        .tooltip('show')
    }
  }

  renderConfirm = () => (
    <div className={`confirm popover fade bs-popover-left ${this.state.showConfirm ? 'show' : ''}`}>
      <div className="arrow"></div>
      <h3 className="popover-header">{this.props.confirm}</h3>
      <div className="popover-body">
        <a onClick={this.hendleAction} className='btn btn-danger'>Excluir</a>
        <a onClick={this.hendleCancel} className='btn btn-light'>Cancelar</a>
      </div>
    </div>
  )

  hendleCancel = () => {
    this.setState({ showConfirm: false })
  }

  hendleAction = () => {
    this.setState({ showConfirm: false })
    this.props.onClick()
  }

  render() {
    const {children, type, iconName, leftIcon, className, isLink, ...rest} = { ...this.props }

    if (this.props.confirm) {
      rest.onClick = () => this.setState({ showConfirm: true })
    }

    rest.className = `btn btn-${type} ${className}`

    const icon = iconName ? <i className={`fa fa-${iconName}`}></i> : null
    const left = leftIcon && icon
    const right = !leftIcon && icon

    let Button = isLink
      ? <Link ref={this.setTooltip} {...rest}>{left} {children} {right}</Link>
      : <button ref={this.setTooltip} {...rest}>{left} {children} {right}</button>

    if (!this.props.confirm) return Button
    return <span className='btn-component'>{Button}{this.renderConfirm()}</span>
  }
}

Button.propTypes = {
  type: PropTypes.string,
  iconName: PropTypes.string,
  rightIcon: PropTypes.bool,
  className: PropTypes.string,
  isLink: PropTypes.bool,
}

Button.defaultProps = {
  type: 'default',
  className: '',

}

export default Button