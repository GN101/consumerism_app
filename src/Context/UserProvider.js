import React from 'react';
import { auth } from '../firebase/firebase';

export const UserContext = React.createContext({ user: null });
export class UserProvider extends React.Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged((userAuth) => {
      this.setState({ user: userAuth });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
