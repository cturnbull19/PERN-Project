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
              <h1>Welcome to the Fitness App of Your Dreams</h1>
              <p>Welcome to FitFeline, the one-of-a-kind fitness app that combines the charm of cartoon cats with the world of fitness and exercise! Our unique app offers a variety of workout routines, yoga sessions, and meditation practices, all demonstrated through delightful and motivational cartoon cat animations. Whether you're a fitness enthusiast or just starting your journey towards a healthier lifestyle, FitFeline makes exercising fun and engaging. With our user-friendly interface, you can easily navigate through different workouts, track your progress, and set fitness goals, all while enjoying the playful antics of our cartoon cats. Perfect for cat lovers and fitness fans alike, FitFeline is here to inspire you to stay active, healthy, and happy, accompanied by your adorable, whiskered workout buddies!</p>
              <p>Use the tabs above to navigate through the website</p>
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
