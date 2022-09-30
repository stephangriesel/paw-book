import './App.css';
import Dogs from './components/Dogs';
import Dog from './components/Dog';
import Logo from './components/Logo';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import Favorites from './components/Favorites';
import Heart from './icons/HeartFill'

function App() {
  return (
    <Router>
      <div>
      <nav>
          <ul>
            <li>
              <Link to="/"><Logo /></Link>
            </li>
            <li>
              <Link to="/favorites"><Heart /></Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            exact path="/"
            element={<Dogs />}
          >
          </Route>
          <Route
            exact path="/dog/:name"
            element={<Dog />}
          >
          </Route>
          <Route
            exact path="/favorites"
            element={<Favorites />}
          >
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
