import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Register from '../pages/Register'
import Login from '../pages/Login'
import InstallButton from '../components/InstallButton'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <InstallButton />
    </>
  )
}

export default App