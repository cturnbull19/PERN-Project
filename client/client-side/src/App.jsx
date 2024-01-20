import { useState } from 'react'
import './App.css'
import './index.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'


function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <div>
        <h1>Home Page</h1>
      </div>
    </>
  )
}

export default App
