import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import { Switch, Route } from 'react-router-dom';

// 
import FirstTime from './components/FirstTime'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from "./components/PrivateRoute"

/* Components
===========*/
import Nav from './components/Nav'
import Welcome from './pages/Welcome'
import SignUp from './pages/SignUp'
import AddItem from './pages/AddItem'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Connexion from './pages/Connexion'
import Profile from './pages/Profile'


export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Nav />

        <Switch>
          <Route exact path="/" component={Welcome} />

          <FirstTime exact path="/signup" component={SignUp} />
          <PublicRoute exact path="/signin" component={SignIn} />

          <PrivateRoute path='/home' component={Home}/>
          <PrivateRoute exact path="/add-item" component={AddItem} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/connections" component={Connexion}/>

        </Switch>
      </div>
    );
  }
}


