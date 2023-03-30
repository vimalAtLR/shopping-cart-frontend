import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { 
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Notfound from './components/Notfound';
import { ToastContainer } from 'react-toastify';
import Register from './components/auth/Register';
import Auth from './components/auth/Auth';
import Login from './components/auth/Login';

function App() {
  return (
    <>
      <HashRouter>
      <ToastContainer/>
        <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/' element={<Auth><Home/></Auth>}/>
          <Route exact path='/cart' element={<Auth><Cart/></Auth>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          <Route exact path='/not-found' element={<Notfound/>}/>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
