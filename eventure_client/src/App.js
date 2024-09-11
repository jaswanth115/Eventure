import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Components/Signup';
import Login from './Components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home';

function App() {
 
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;