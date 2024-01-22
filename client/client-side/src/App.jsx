import { useState } from 'react'
import './App.css'
import './index.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigations from './components/Navigations'
import Login from './components/Login'
import Register from './components/Register'
//import Account from './components/Account'
import Exercises from './components/Exercises'
import SingleExercise from './components/SingleExercise'

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
          <Route path='/exercises/:exerciseId' element = { <SingleExercise />}></Route>
          <Route path='/register' element = { <Register setToken={setToken} />}/>
          <Route path='/login' element = { <Login setToken={setToken} />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
