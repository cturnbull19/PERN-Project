import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../api/fetching'
import { updateToken } from '../actions/actionsSlice'
import { Link } from 'react-router-dom'

const Register = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ first_name, setFirst_Name ] = useState('')
    const [ last_name, setLast_Name ] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ register, { error, successMessage } ] = useRegisterMutation();

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const result = await register({ first_name, last_name, email, password });

            console.log(result)
            dispatch(updateToken(result.data.token))
        } catch (error) {
            console.error(error);
        }
        navigate('/')
    }

    return (
        <>
            <h1>Register</h1>
            {error && <p>{error}</p>}
            <div>
                <form onSubmit={handleRegister} className='register-container'>
                    <div className='form-floating mb-3'>
                        <input
                            className='form-control'
                            id='floatingInput'
                            type='text'
                            placeholder='text'
                            value={first_name}
                            onChange= {(event) => {
                                setFirst_Name(event.target.value)
                            }}
                        />
                        <label htmlFor='floatingInput'>First Name: {''}</label>
                    </div>
                    
                    <div className='form-floating mb-3'>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='text'
                            value={last_name}
                            onChange= {(event) => {
                                setLast_Name(event.target.value)
                            }}
                        />
                        <label htmlFor='floatingInput'>Last Name: {''}</label>
                    </div>

                    <div className='form-floating mb-3'>
                        <input
                            className='form-control'
                            type='email'
                            placeholder='name@email.com'
                            value={email}
                            onChange= {(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                        <label htmlFor='floatingInput'>Email: {''}</label>
                    </div>

                    <div className='form-floating'>
                        <input
                            className='form-control'
                            type='password'
                            id='floatingPassword'
                            placeholder='password'
                            value={password}
                            onChange= {(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                        <label htmlFor='floatingPassword'>Password: {''}</label>
                    </div>
                    {successMessage && <p>{successMessage}</p>}
                    <button type='submit'>
                        Register
                    </button>
                </form>
            </div>
        </>
    )
}

export default Register