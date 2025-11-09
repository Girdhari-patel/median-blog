 import {  Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Publish } from './pages/Publish'
import Blog from './pages/Blog'
import { Blogs } from './pages/Blogs'
import LandingPage from './pages/LandingPage'
import { AppBar } from './components/AppBar'
import Footer from './pages/Footer'

import { useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
   
  const auth = useContext(AuthContext);
  const navigate= useNavigate();

 if (!auth) return null; // optional check

   const { user} = auth;
   

 //✅ Fix: only navigate when a user exists and you’re not already on /blogs.

useEffect(() => {
  if (user) {
    navigate('/blogs');
  }
}, [user])
  
  

  return (
    < >
    <div className='min-h-screen flex flex-col'>
      <AppBar />
      <main className='flex-grow'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected routes: if no user, redirect to /signin */}
        <Route path="/blog/:id" element={user ? <Blog /> : <Navigate to="/signin" replace />} />
        <Route path="/blogs" element={user ? <Blogs /> : <Navigate to="/signin" replace />} />
        <Route path="/publish" element={user ? <Publish /> : <Navigate to="/signin" replace />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </>
  )
}

export default App
