import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../api/fetching'
import { updateToken, updateUserId } from '../actions/actionsSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [ login, { error, successMessage } ] = useLoginMutation();
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const result = await login({ email, password });
            dispatch(updateToken(result.data.token))
            dispatch(updateUserId(result.data.user.id))
        } catch (error) {
            console.error(error);
        }
        navigate('/')
    }
    return (
        <div className='loginPage'>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <label>Email: {''}
                    <input
                        type='text'
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                </label>
                <label>Password: {''}
                    <input
                        type='text'
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                </label>
                {successMessage && <p>{successMessage}</p>}
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
export default Login 