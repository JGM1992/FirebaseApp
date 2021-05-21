import './App.css';
import React from 'react';
import { Admin } from './components/Admin'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Menu } from './components/Menu'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Menu />
      <Switch>
          <Route exact path='/'><Home /></Route>
          <Route path='/admin'><Admin /></Route>
          <Route path='/login'><Login /></Route>
        </Switch>
      </Router>
    </React.Fragment>
  ); 
}

export default App;
