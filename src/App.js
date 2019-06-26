import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import checkAuth from './components/CheckAuth/checkAuth';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp, faArrowLeft)

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route path="/" exact component={checkAuth(Dashboard)}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
      </Switch>
      </div>
    );
  }
}

export default App;
