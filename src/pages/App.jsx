import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App