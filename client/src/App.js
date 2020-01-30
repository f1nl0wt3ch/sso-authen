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
import PrivateRoute from './components/route/PrivateRoute'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: localStorage.getItem('auth') || false,
      token: localStorage.getItem('token') || null,
      msg: localStorage.getItem('msg') || ""
    }
  }

  render() {
    return (
      <div>
        {
        <Switch>
            <Route path="/" exact component={() => <HomePageComponent {...this.state} />} />
            <Route path="/login" exact component={() => <LoginPageComponent />} />
            <Route path="/signup" component={() => <SignupPageComponent {...this.state} />} />
            <Route path="/dashboard" component={() => <DashboardPageComponent {...this.state} />} />
            <Route path="/admin" component={() => <AdminPageComponent {...this.state} />} />} />
         </Switch>
        }
      </div>
    )
  }
}



