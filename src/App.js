import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={{marginTop:'100px'}}>
        <p>
          Content
        </p>
      </main>
    </div>
  );
}

export default App;
