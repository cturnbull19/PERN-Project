import React from 'react'
import { Link } from 'react-router-dom'
import { useGetExercisesQuery } from '../api/fetching'
import { useSelector } from 'react-redux'
import { useState } from 'react'


const Exercises = () => {

    const token = useSelector((it) => it.actionsSlice.token);

    const { data = {}, error, isLoading } = useGetExercisesQuery()
    //input filter logic
    //input search logic
    //inpute search input logic

    //searchExercises function 

    //want a similar function to checkout, but to save exercises instead of books
    if (isLoading) {
        return <div>loading...</div>
    }
    
    if (error) {
        return <div> Error: {error.message} </div>
    }

    return (
        <>
        <h1>Exercise Library</h1>

        <div className='exercises'>
            {data.exercises.map((exercise) => (
                <div key={exercise.id} className='exercise-card-container'>
                    <img className='exercise-image' src={exercise.imgURL} alt={exercise.name}></img>
                    <div className ='exercise-details'>
                        <h2> {exercise.name} </h2>
                        <p><strong>Description:</strong> {exercise.description} </p>
                    </div>
                </div>
            ))}
        </div> 
        </>
    )
}

export default Exercises