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
  constructor() {
    super()
    this.handleAuthenticated = this.handleAuthenticated.bind(this)
    this.state = {
      authObj: {
        auth: false,
        statusCode: 0,
        token: null,
        msg: ""
      }
    }
  }

  handleAuthenticated = res => {
    this.setState({
      authObj: {
        auth: res.auth,
        token: res.token,
        msg: res.msg
      }
    })
  }

  render() {
    const App = () => (
      <div>
        {
          this.state.authObj.auth ? (
            <Switch>
              <Route path="/" exact component={() => <HomePageComponent authObj={this.state.authObj} />} />
              <Redirect 
                  to={{
                  pathname: "/"
                }} 
               />
              <Route path="/dashboard" component={() => <DashboardPageComponent authObj={this.state.authObj} />} />
              <Route path="/admin" component={() => <AdminPageComponent authObj={this.state.authObj} />} />
            </Switch>
          ) : (
              <Switch>
                <Route path="/login" component={() => <LoginPageComponent  handleAuthenticated={this.handleAuthenticated}/>} />
                <Route path="/signup" component={() => <SignupPageComponent />} />
                <Redirect 
                  to={{
                  pathname: "/login"
                }} 
               />
              </Switch>
            )
        }
      </div>
    )
    return (
      <App />
    )
  }
}



