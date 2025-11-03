import { BrowserRouter, redirect, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
 

import { Publish } from './pages/Publish'
import Blog from './pages/Blog'
import {Blogs} from './pages/Blogs';
import LandingPage from './pages/LandingPage'
import { AppBar } from './components/AppBar'
import Footer from './pages/Footer'
import { useEffect } from 'react'
function App() {
 
  return (
    <>
      <BrowserRouter>
      <AppBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />}  />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/blogs' element={<Blogs/>} />
          <Route path='/publish' element={<Publish/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App