import React from 'react'
import { Link } from 'react-router-dom'

export default ({text, type, iconName, className, isLink, ...rest}) => {
  rest.className = `btn btn-${type || 'default'} ${className || ''}`
  const icon = iconName ? <i className={`fa fa-${iconName}`}></i> : null

  const Button = isLink
    ? <Link {...rest}>{text} {icon}</Link>
    : <button {...rest}>{text} {icon}</button>

  return Button
}