import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCreateExerciseMutation } from '../api/bookBudyApi'
import { updateToken } from '../actions/actionsSlice'
import { Link } from 'react-router-dom'

const createExercise = () => {
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ imgURL, setImgURL ] = useState('')
    const [ createExercise, { error, successMessage } ] = useCreateExerciseMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCreate = async (e) => {
        e.preventDefault()

        try {
            const result = await createExercise({name, description, imgURL});
            return result;
        } catch (error) {
            console.error(error);
        }
        navigate('/exercises')
    }

    return (
        <>
            <h1>Create New Exercise</h1>
            {error && <p>{error}</p>}
            <div className='form-container'>
                <form onSubmit={handleCreate} classname='register-container'>
                    <label>Exercise Name: {''}
                        <input 
                            type='text'
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                        />
                    </label>
                </form>
            </div>
        </>
    )
}