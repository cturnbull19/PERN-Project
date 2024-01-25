import React from 'react'
import { useGetSingleExerciseQuery } from '../api/fetching'
import '../index.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleExercise = () => {
    const {exerciseId} = useParams();
    const token = useSelector((it) => it.actionsSlice.token);

    const {data = {}, error, isLoading } = useGetSingleExerciseQuery(exerciseId);
    //input data for a "checkout" query. Similar to checking out a book
    //input handleCheckout function

    return(
        <>
            <div key={data.id} className='exerciseId'>
                <img className='exercise-image' src={new URL(`../assets/images/${data.imgURL}`, import.meta.url).href} alt={data.name}></img>
                <div className='exercise-details'>
                    <h2>{data.name}</h2>
                    <p><strong>Description: </strong>{data.description}</p>
                    <button><Link to='/exercises'>Return to Exercises</Link></button>
                </div>
            </div>
        </>
    )
}

export default SingleExercise 