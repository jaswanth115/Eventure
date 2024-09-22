import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home';

function App() {
 
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/home/:name' element={<Home />} /> {/* Dynamic route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;