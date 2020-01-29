import React from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import LoginPageComponent from './components/login/LoginPageComponent'
import DashboardPageComponent from './components/dashboard/DashboardPageComponent'
import SignupPageComponent from './components/signup/SignupPageComponent'
import HomePageComponent from './components/home/HomePageComponent'
import AdminPageComponent from './components/admin/AdminPageComponent'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleAuthenticated = this.handleAuthenticated.bind(this)
    this.state = {
      authObj: {
        auth: false,
        token: null,
        msg: ""
      }
    }
  }

  handleAuthenticated = res => {
    //console.log(`${JSON.stringify(res)}`)
    this.setState({
      authObj: {
        auth: res.auth,
        token: res.token,
        msg: res.msg
      }
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={() => <HomePageComponent authObj={this.state.authObj} />} />
          <Route path="/login" exact component={() => <LoginPageComponent handleAuthenticated={this.handleAuthenticated} />} />
          <Route path="/signup" exact component={() => <SignupPageComponent authObj={this.state.authObj} />} />
          <Route path="/dashboard" exact component={() => <DashboardPageComponent authObj={this.state.authObj} />} />
          <Route path="/admin" exact component={() => <AdminPageComponent authObj={this.state.authObj} />} />} />
        </Switch>
      </div>
    )
  }
}



