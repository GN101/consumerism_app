import React from 'react';
import Navbar from './components/Navbar';
import UserInputColumn from './components/UserInputColumn/UserInputColumn';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={{ marginTop: '100px' }}>
        <UserInputColumn />
      </main>
    </div>
  );
}

export default App;
