import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import LoginPageComponent from './components/login/LoginPageComponent'
import DashboardPageComponent from './components/dashboard/DashboardPageComponent'
import SignupPageComponent from './components/signup/SignupPageComponent'
import HomePageComponent from './components/home/HomePageComponent'
import AdminPageComponent from './components/admin/AdminPageComponent'

export default class App extends React.Component {

  render() {
    const App = () => (
      <div>
        <Switch>
          <Route path="/" exact component={() => <HomePageComponent />} />
          <Route path="/login"  component={() => <LoginPageComponent />} />
          <Route path="/signup"  component={() => <SignupPageComponent />} />
          <Route path="/dashboard"  component={() => <DashboardPageComponent />} />
          <Route path="/admin"  component={() => <AdminPageComponent />} />
        </Switch>
      </div>
    )
    return (
      <App />
    )
  }
}



