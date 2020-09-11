import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserInputColumn from './components/UserInputColumn/UserInputColumn';
import UserSignUp from './components/UserSignUp';


const App = () => (
  <div className="App">
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={UserInputColumn} />
        <Route path="/signUp" exact component={UserSignUp} />
      </Switch>

    </Router>


  </div>

);

export default App;
