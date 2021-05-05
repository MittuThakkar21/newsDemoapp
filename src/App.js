import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Add from './components/Add';
import Edit from './components/Edit';
import Home from './components/Home';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/add' component={Add} />
          <Route exact path='/edit/:id' component={Edit} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
