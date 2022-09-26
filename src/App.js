import logo from './logo.svg';
import './App.css';
import Dogs from './components/Dogs';
import { useState } from 'react';

function App() {
  // const [item, setItem] = useState;
  return (
    <div className="App">
      <header className="App-header">
        <Dogs />
      </header>
    </div>
  );
}

export default App;
