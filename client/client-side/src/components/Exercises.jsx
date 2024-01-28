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
            <div className='container-lg'>
                <div className='text-center'>
                    <h1>Exercise Library</h1>
                </div>
                <div className='row row-cols-sm-1 row-cols-md-4 g-4'>
                    {data.map((exercise) => (
                        <div className='col-9 col-lg-6 p-2' key={exercise.id}>
                            <div className='card border-2 h-100'>
                                <img className='card-img-top' src={new URL(`../assets/images/${exercise.imgURL}`, import.meta.url).href} alt={exercise.name}></img>
                                <h2 className='card-title text-center'> {exercise.name} </h2>
                                <p className='card-body text-center py-6'><strong>Description:</strong><span className='lead card-subtitle'> {exercise.description}</span> </p>
                                <button className='btn btn-outline-dark' type='button' role='button'><Link className= 'nav-link' to={`/exercises/${exercise.id}`}>See More</Link></button>
                                {(!token) ? (
                                    <>
                                    <button className='btn btn-outline-dark' type='button' role='buton'><Link className='nav-link' to='/login'>Login to Like Exercise</Link></button>
                                    </>
                                ): (
                                    <>
                                    <button className= 'btn btn-outline-success' onClick = {() => {
                                    handleLike(exercise.id)
                                    }}>Like</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                      
                </div> 
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
            <div className='container-lg'>
                <div className='row row-cols-sm-1 row-cols-md-4 g-4'>
                    {filtered.map((exercise) => (
                        <div key={exercise.id} className='col-9 col-lg-6 p-2'>
                            <div className='card border-2 h-100'>
                                <img className='card-img-top' src=
                                {new URL(`../assets/images/${exercise.imgURL}`, import.meta.url).href} alt={exercise.name}></img>
                                <h2 className='card-title text-center'> {exercise.name} </h2>
                                <p className='card-body text-center py-6'><strong>Description:</strong><span className='lead card-subtitle'> {exercise.description}</span></p>
                                <button className='btn btn-outline-dark' type='button' role='button'><Link className= 'nav-link' to={`/exercises/${exercise.id}`}>See More</Link></button>

                                {(!token) ? (
                                    <>
                                    <button className='btn btn-outline-dark' type='button' role='buton'><Link className='nav-link' to='/login'>Login to Like Exercise</Link></button>
                                    </>
                                ): (
                                    <>
                                    <button className= 'btn btn-outline-success' onClick = {() => {
                                    handleLike(exercise.id)
                                    }}>Like</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div> 
            </>
        )
    }
    
}

export default Exercises