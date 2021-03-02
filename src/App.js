import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UserSignUp from './components/UserSignUp/UserSignUp';
import Home from './routes/home/Home';

const App = () => (
  <div className="App">
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signUp" exact component={UserSignUp} />
      </Switch>
    </Router>
  </div>
);

export default App;
