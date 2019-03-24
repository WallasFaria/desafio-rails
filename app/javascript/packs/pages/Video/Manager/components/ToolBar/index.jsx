import React, { Component } from 'react'

import './style.scss'

class ToolBar extends Component {
  state = {
    searchOrderOptions: [
      { label: 'Mais recentes', value: 'created_at-desc' },
      { label: 'Mais antigos', value: 'created_at-asc' },
      { label: 'Maior visualização', value: 'total_views-desc' },
      { label: 'Menos visualização', value: 'total_views-asc' },
    ]
  }

  render() {
    const { searchOrderOptions } = this.state

    return (
      <div className='toolbar'>
        <div className='search'>
          <i className="fa fa-search"></i>
          <input type="search" className='form-control' placeholder='Buscar'
            onChange={e => this.props.onSearch(e.target.value)}/>
        </div>

        <div className='filter'>
          <div className='content-form'>
            <label htmlFor="search-order">Ordernar por:</label>
            <select
              id="search-order"
              className='form-control'
              onChange={e => this.props.onSort(e.target.value)}>

              {searchOrderOptions.map((option, i) =>
                <option key={i} value={option.value}>{option.label}</option>)}
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default ToolBar
