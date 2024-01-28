import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { useListLikesMutation, useRemoveLikeMutation } from '../api/fetching'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateReservations } from '../actions/actionsSlice'
import { Link } from 'react-router-dom'

export default function WorkoutBuilder() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const reservations = useSelector((it) => it.actionsSlice.reservations);
    const userId = useSelector((it) => it.actionsSlice.userId);
    const [ removeLike, {isSuccess: removeLikeSuccess, error: removeLikeError} ] = useRemoveLikeMutation()

    const [ listLikes ] = useListLikesMutation();

    async function fetchListLikes() {
        try {
            const response = await listLikes(userId);
            console.log(response.data)
            dispatch(updateReservations(response.data))
        } catch (error) {
            console.error(error)
        }
    }

    async function handleRemoveLike(id) {
        try {
            console.log(userId)
            await removeLike({id, userId});
            fetchListLikes()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchListLikes();
    }, []);

    return (
        <>
            <div>
                {reservations && (
                    <>
                    <div>
                        <h3>Liked Exercises</h3>
                        <div className='row row-cols-sm-1 row-cols-md-4 g-4'>
                            {reservations.map((exercise) => (
                                <div className='col-9 col-lg-6 p-2' key={exercise.likeId}>
                                    <div className='card border-2 h-100'>
                                        <img className='card-img-top' src={new URL(`../assets/images/${exercise.imgURL}`, import.meta.url).href} alt={exercise.name}></img>
                                        <h4 className='card-title text-center'>{exercise.name}</h4>
                                        <p className='card-body text-center py-6'> {exercise.description}</p>
                                        <button className='btn btn-outline-dark' type ='submit'><Link className='nav-link' to={`/exercises/${exercise.id}`}>See More</Link></button>
                                        <button className='btn btn-outline-danger' onClick={() => handleRemoveLike(exercise.id)} type = 'submit'>Remove Like</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </>
                )}
            </div>
        </>
    )
}


