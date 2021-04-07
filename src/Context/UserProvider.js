import React from 'react';
import 'firebase/auth';

const UserContext = React.createContext({ user: null });

export default UserContext;
