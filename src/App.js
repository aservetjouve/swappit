import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import axios from 'axios'

import config from './config';
import { Switch, Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom'

/* Components
===========*/
import Nav from './components/Nav'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Banane from './pages/Banane'

class App extends React.Component {
  state = {
    isLoggedIn: null
  }

  handleLogout = () => {
    //console.log(document.cookie)
    axios.post(`${config.API_URL}/auth/logout`, {}, { withCredentials: true})
    .then((res) => {
      console.log(res)
      this.setState({
        isLoggedIn: null
      }, () => {
        this.props.history.push('/')
      })
    })
  }

  handleSignIn = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value
    console.log(email, password)
    axios.post(`${config.API_URL}/auth/signin`, {
      email: email,
      password: password
    })
    .then((res) => {
      console.log('It is working')
      this.setState({
        isLoggedIn: res.data
      }, () => {
        this.props.history.push('/')
      })
    })
    .catch((res) => {
      console.log('It is not working', res)
    })
  }

  handleSignup = (event) => {
    event.preventDefault()
    let firstName = event.target.firstName.value;
    let lastName = event.target.lastName.value;
    let location  = event.target.location.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    axios.post(`${config.API_URL}/auth/signup`, {
      firstName: firstName,
      lastName: lastName,
      location: location,
      email: email, 
      password: password
    }, { withCredentials: true})
      .then((res) => {
        this.setState({
          isLoggedIn: res.data
        }, () => {
          this.props.history.push('/')
        })
      })
  }

  render(){
    const {isLoggedIn} = this.state;
    console.log(isLoggedIn)
    return (
		<>
			<Nav
				isLoggedIn={isLoggedIn}
				onLogout={this.handleLogout}
			/>

			<Switch>
				<Route
					exact
					path="/"
					render={() => {
						return <Home isLoggedIn={isLoggedIn}/>;
					}}
				/>

        <Route
					exact
					path="/banane"
					render={() => {
						return <Banane isLoggedIn={isLoggedIn}/>;
					}}
				/>
        {/*Sign In Route*/}
				<Route
					path="/signin"
					render={(routeProps) => {
						return (
							<SignIn
								onSignIn={this.handleSignIn}
								{...routeProps}
							/>
						);
					}}
				/>
				{/* Sign Up Route */}
				<Route
					path="/signup"
					render={(routeProps) => {
						return (
							<SignUp
								onSignUp={this.handleSignup}
								{...routeProps}
							/>
						);
					}}
				/>
			</Switch>
		</>
	);
  }
}

export default withRouter(App)
