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
            <div className='form-container'>
                <form onSubmit={handleRegister} className='register-container'>
                    <label>First Name: {''}
                        <input
                            type='text'
                            value={first_name}
                            onChange= {(event) => {
                                setFirst_Name(event.target.value)
                            }}
                        />
                    </label>
                    <label>Last Name: {''}
                        <input
                            type='text'
                            value={last_name}
                            onChange= {(event) => {
                                setLast_Name(event.target.value)
                            }}
                        />
                    </label>
                    <label>Email: {''}
                        <input
                            type='text'
                            value={email}
                            onChange= {(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                    </label>
                    <label>Password: {''}
                        <input
                            type='text'
                            value={password}
                            onChange= {(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </label>
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