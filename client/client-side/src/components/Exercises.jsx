import React from 'react'
import { Link } from 'react-router-dom'
import { useGetExercisesQuery, useLikeMutation } from '../api/fetching'
import { useSelector } from 'react-redux'
import { useState } from 'react'


const Exercises = () => {

    const token = useSelector((it) => it.actionsSlice.token);
    const userId = useSelector((it) => it.actionsSlice.userId);

    const { data, error, isLoading } = useGetExercisesQuery()
    const [ likeExercise, {isSuccess, error: likeExerciseError} ] = useLikeMutation()
    const [ filtered, setFiltered ] = useState([])
    const [ searched, setSearched ] = useState(0)
    const [ searchInput, setSearchInput ] = useState('')

    function searchExercises(event) {
        event.preventDefault()
        setSearched(searched + 1)
        const filter = data.filter((exercise) => 
            exercise.name.toLowerCase().includes(searchInput.toLowerCase()))
        setFiltered(filter)
    };

    //want a similar function to checkout, but to save exercises instead of books
    async function handleLike(id) {
        try {
        console.log(id, userId)
        const response = await likeExercise({id, userId})
        } catch (error) {
            console.error(error)
        }
    }

    if (isLoading) {
        return <div>loading...</div>
    }
    
    if (error) {
        return <div> Error: {error.message} </div>
    }

    if(!searched) {

        return (
            <>
            <form className='searchBar' onSubmit={searchExercises}>
                <label>
                    Search Exercise by Name:
                    <input
                        type='search'
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </label>
                <button type='submit'>Search Exercise</button>
            </form>
            <h1>Exercise Library</h1>
    
            <div className='exercises'>
                {data.map((exercise) => (
                    <div key={exercise.id} className='exercise-card-container'>
                        <img className='exercise-image' src={new URL(`../assets/images/${exercise.imgURL}`, import.meta.url).href} alt={exercise.name}></img>
                        <div className ='exercise-details'>
                            <h2> {exercise.name} </h2>
                            <p><strong>Description:</strong> {exercise.description} </p>
                            <button type='submit'><Link to={`/exercises/${exercise.id}`}>See More</Link></button>
                            <button onClick = {() => {
                                handleLike(exercise.id)
                            }}>Like</button>
                        </div>
                    </div>
                ))}
            </div> 
            </>
        )
    } if(searched >0 && filtered.length >0){
        return (
            <>
            <form onSubmit={searchExercises}>
                <label>
                    Search Exercise by Name:
                    <input
                        type='search'
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </label>
                <button type='submit'>Search Exercise</button>
                {filtered.length != data.length ? <p className='searchResults'> Exercises Found: {filtered.length}</p> : ''}
            </form>
            <div className='exercises'>
                {filtered.map((exercise) => (
                    <div key={exercise.id} className='exercise-card-container'>
                        <img className='exercise-image' src=
                        {new URL(`../assets/images/${exercise.imgURL}`, import.meta.url).href} alt={exercise.name}></img>
                        <div className ='exercise-details'>
                            <h2> {exercise.name} </h2>
                            <p><strong>Description:</strong> {exercise.description} </p>
                            <button type='submit'><Link to={`/exercises/${exercise.id}`}>See More</Link></button>
                            <button onClick = {() => {
                                handleLike(exercise.id)
                            }}>Like</button>
                        </div>
                    </div>
                ))}
            </div> 
            </>
        )
    }
    
}

export default Exercises