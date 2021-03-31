import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UserSignUp from './components/UserSignUp/UserSignUp';
import UserLogin from './components/UserLogin/UserLogin';
import Home from './routes/home/Home';
import styles from './App.module.css';
import AlternateThemeContext from './Context/AlternateTheme-context';

const App = () => {
  const [theme, setTheme] = useState(true);
  const value = { theme, setTheme };

  return (
    <AlternateThemeContext.Provider value={value}>
      <div className={theme ? styles.app : styles.app_dark}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={UserLogin} />
            <Route path="/signUp" component={UserSignUp} />
          </Switch>
        </Router>
      </div>
    </AlternateThemeContext.Provider>
  );
};

export default App;
