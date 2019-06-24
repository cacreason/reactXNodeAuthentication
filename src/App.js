import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home/Home';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp)

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route path="/" component={Home}/>
      </Switch>
      </div>
    );
  }
}

export default App;
