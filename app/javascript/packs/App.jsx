import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import VideoShow from './pages/Video/Show'
import VideoManager from './pages/Video/Manager'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/my-videos' component={VideoManager} />
          <Route exact path='/video/:id' component={VideoShow} />
        </Switch>
      </div>
    )
  }
}

export default App