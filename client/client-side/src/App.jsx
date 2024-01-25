import { useState } from 'react'
import './App.css'
import './index.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigations from './components/Navigations'
import Login from './components/Login'
import Register from './components/Register'
//import Account from './components/Account'
import WorkoutBuilder from './components/WorkoutBuilder'
import Exercises from './components/Exercises'
import SingleExercise from './components/SingleExercise'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <div>
        <header className='header'>
          <h4>Turnbull Training</h4>
          <Navigations token={token}/>
        </header>
      </div>
      <div>
        <Routes>
          <Route path='/' element = {
            <div>
              <h1>Welcome to PurrfectFit</h1>
              <div className='intro-paragraph'>
                <p>Your go-to destination for fitness inspiration with a whimsical twist! Our innovative fitness website features an extensive library of exercises, each accompanied by delightful photo demonstrations performed by cartoon cats. Not only will you find a wide range of workouts suitable for all fitness levels, but you can also 'like' your favorite exercises and easily access them later in our user-friendly Workout Builder section. Whether you're looking to tone up, build strength, or increase flexibility, PurrfectFit provides a unique and engaging way to plan and track your fitness journey, all while enjoying the charming antics of our feline friends. Get ready to stretch, lift, and squat alongside our adorable cartoon cats, and make your workout routine more enjoyable than ever!</p>
              </div>
            </div>
          }>
          </Route>
          <Route path='/exercises' element = { <Exercises />}></Route>
          <Route path='/exercises/:exerciseId' element = { <SingleExercise />}></Route>
          <Route path='/register' element = { <Register setToken={setToken} />}/>
          <Route path='/login' element = { <Login setToken={setToken} />}/>
          <Route path='/workoutBuilder' element = { <WorkoutBuilder />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
