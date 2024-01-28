import React from 'react'
import { useGetSingleExerciseQuery, useLikeMutation } from '../api/fetching'
import '../index.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleExercise = () => {
    const {exerciseId} = useParams();
    const token = useSelector((it) => it.actionsSlice.token);
    const userId = useSelector((it) => it.actionsSlice.userId);

    const {data = {}, error, isLoading } = useGetSingleExerciseQuery(exerciseId);

    const [ likeExercise ] = useLikeMutation()

    async function handleLike(id) {
        try {
            console.log(id, userId)
            const response = await likeExercise({id, userId})
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className='row row-cols-sm-1 row-cols-md-4 g-4'>
            <div key={data.id} className='col-9 col-lg-6 p-2'>
                <div className='card border-2 h-100'>
                    <img className='card-img-top' src={new URL(`../assets/images/${data.imgURL}`, import.meta.url).href} alt={data.name}></img>
                    <h2 className='card-title text-center'>{data.name}</h2>
                    <p className='card-body text-center py-6'><strong>Description: </strong><span className='lead card-subtitle'> {data.description}</span></p>
                    <button className='btn btn-outline-dark' type='button' role='button'><Link className= 'nav-link' to='/exercises'>Return to Exercises</Link></button> 
                    {(!token) ? (
                        <>
                        <button className='btn btn-outline-dark' type='button' role='buton'><Link className='nav-link' to='/login'>Login to Like Exercise</Link></button>
                        </>
                    ) :(
                        <>
                        <button className='btn btn-outline-success' onClick = {() => {handleLike(data.id)}}>Like</button>
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default SingleExercise 