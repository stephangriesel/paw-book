import logo from './logo.svg';
import './App.css';
import Dogs from './components/Dogs';
import Dog from './components/Dog';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';

function App() {
  // const [item, setItem] = useState;
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/dogs">Dogs</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            exact path="/dogs"
            element={<Dogs />}
          >
          </Route>
          <Route
            exact path="/dog/:name"
            element={<Dog />}
          >
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
