import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { useListLikesMutation } from '../api/fetching'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateReservations } from '../actions/actionsSlice'
import { Link } from 'react-router-dom'

export default function WorkoutBuilder() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const reservations = useSelector((it) => it.actionsSlice.reservations);
    const userId = useSelector((it) => it.actionsSlice.userId);

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
                        <div>
                            {reservations.map((exercise) => (
                                <div key={exercise.likeId}>
                                    <h4>{exercise.name}</h4>
                                    <img className='exerciseImage' src={exercise.imgURL} alt={exercise.name}></img>
                                    <button type ='submit'><Link to={`/exercises/${exercise.id}`}>See More</Link></button>
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


