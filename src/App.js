import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Bill from './pages/Bill';
import Signup from './pages/Signup';
import { Wishlist } from './pages/Wishlist';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bills" element={<Bill />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<Wishlist />} />


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
