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

function App() {
  // const [item, setItem] = useState;
  return (
    <Router>
      <div>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
