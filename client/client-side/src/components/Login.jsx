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
            console.log(result.data.user.id)
            dispatch(updateUserId(result.data.user.id))
        } catch (error) {
            console.error(error);
        }
        navigate('/')
    }
    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin} className='register-container-'>
                <div className='form-floating mb-3'>    
                    <input
                        className='form-control'
                        id='floatingEmail'
                        placeholder='email@email.com'
                        type='email'
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                    <label htmlFor='floatingEmail'>Email: {''}</label>
                </div>
                <div className='form-floating'>
                    <input
                        className='form-control'
                        id='floatingPassword'
                        type='password'
                        placeholder='password'
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <label htmlFor='floatingPassword'>Password: {''}</label>
                    {successMessage && <p>{successMessage}</p>}
                </div>
                <button className='btn btn-secondary m-2' type='submit'>Login</button>
            </form>
        </div>
    )
}
export default Login 