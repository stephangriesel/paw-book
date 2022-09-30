import './App.css';
import { GlobalProvider } from './context/GlobalState';

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

function App() {
  return (
    <GlobalProvider>
    <Router>
    <Link to="/">
    <Logo />
    </Link>
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
    </Router>
    </GlobalProvider>
  );
}

export default App;
