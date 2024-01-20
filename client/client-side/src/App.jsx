import { useState } from 'react'
import './App.css'
import './index.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigations from './components/Navigations'
//import Login from './components/Login'
//import Register from './components/Register'
//import Account from './components/Account'
//import SingleExercise from './components/SingleExercise'
import Exercises from './components/Exercises'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <div>
        <h4>Turnbull Training</h4>
        <Navigations token={token}/>
      </div>
      <div>
        <Routes>
          <Route path='/' element = {
            <div>
              <h1>Welcome to the Fitness App of Your Dreams</h1>
              <p>Use the tabs above to navigate through the website</p>
            </div>
          }>
          </Route>
          <Route path='/exercises' element = { <Exercises />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
