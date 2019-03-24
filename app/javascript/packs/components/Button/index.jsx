import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Button = (props) => {
  const {children, type, iconName, leftIcon, className, isLink, ...rest} = props

  rest.className = `btn btn-${type} ${className}`
  const icon = iconName ? <i className={`fa fa-${iconName}`}></i> : null
  const left = leftIcon && icon
  const right = !leftIcon && icon

  const Button = isLink
    ? <Link {...rest}>{left} {children} {right}</Link>
    : <button {...rest}>{left} {children} {right}</button>

  return Button
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