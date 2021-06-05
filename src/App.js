import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UserSignUp from './components/UserSignUp/UserSignUp';
import UserLogin from './components/UserLogin/UserLogin';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Home from './routes/home/Home';
import UserPanel from './components/UserPanel/UserPanel';
import styles from './App.module.css';
import AlternateThemeContext from './Context/AlternateTheme-context';
import { UserContext } from './Context/UserProvider';
import UpdateUserData from './Context/UpdateUserData';

const App = () => {
  const [theme, setTheme] = useState(true);
  const value = { theme, setTheme };
  const user = useContext(UserContext);
  const [updatedData, setUpdatedData] = useState(1);
  const defaultValue = { updatedData, setUpdatedData };
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (document.cookie.length > 347) {
      setReveal(true);
    }
  }, [updatedData]);

  return user ? (
    <UpdateUserData.Provider value={defaultValue}>
      <AlternateThemeContext.Provider value={value}>
        <div className={theme ? styles.app : styles.app_dark}>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={UserPanel} />
              {reveal ? <Route path="/results" component={Home} /> : null}
              <Route path="/login" component={UserLogin} />
              <Route path="/signUp" component={UserSignUp} />
            </Switch>
          </Router>
        </div>
      </AlternateThemeContext.Provider>
    </UpdateUserData.Provider>
  ) : (
    <UpdateUserData.Provider value={defaultValue}>
      <AlternateThemeContext.Provider value={value}>
        <div className={theme ? styles.app : styles.app_dark}>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={UserPanel} />
              {reveal ? <Route path="/results" component={Home} /> : null}
              <Route path="/login" component={UserLogin} />
              <Route path="/signUp" component={UserSignUp} />
              <Route path="/passwordReset" component={PasswordReset} />
            </Switch>
          </Router>
        </div>
      </AlternateThemeContext.Provider>
    </UpdateUserData.Provider>
  );
};

export default App;
