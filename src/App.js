import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import EventPage from './pages/EventPage';
import ModalsParent from './components/modals/ModalsParent'
import allActions from './action-creators/all.js'

class App extends Component {
  componentWillMount () {
    if (this.props.loadDataOnStart) {
      this.props.loadAllData()
    }
  }

  render() {
    if (this.props.globalLoading) return (
      <div className="pageloader is-active">
        <div className="title has-text-centered">
          Aileron Airways Milestone App <br/>
          Team 7
        </div>
      </div>
    )
    return (
        <div className="pb-lg">
          {this.props.globalLoading}
          <BrowserRouter>
            <div>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/timeline/:Id" component={TimelinePage}></Route>
              <Route exact path="/event/:Id" component={EventPage}></Route>
            </div>
          </BrowserRouter>
          <ModalsParent />
        </div>
    )
  }
}

var mapStateToProps = function (state) {
  return {
    globalLoading: state.ui.globalLoading
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
    loadAllData: function () {
      dispatch(allActions.loadAllData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
