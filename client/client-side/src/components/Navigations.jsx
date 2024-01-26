import { Link, useNavigate } from 'react-router-dom'
import '../index.css'
import { updateToken } from '../actions/actionsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Navigations = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((it) => it.actionsSlice.token);

    const handleLogOut = () => {
        dispatch(updateToken(''))
        navigate('/login')
    }

    return (
        <div className='navbar navbar-expand-md navbar-light'>
            <div className='container-xxl'>
                <div className='navbar-brand'>
                    <Link to='/' className='fw-bold text-secondary'>Home</Link>
                </div>
                <div>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#main-nav' aria-controls='main-nav' aria-expanded='false' aria-label='Toggle Navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse justify-content-end align-center' id='main-nav'>
                        <div className='navbar-nav'>
                            <div className='nav-item'>
                            <Link to='/exercises' className='nav-link'>Exercise Library</Link>
                            </div>
                            {(!token) ? (
                                <>
                                <div className='nav-item'>         
                                <Link to='/register' className='nav-link'>Register</Link>
                                </div> 
                                <div className='nav-item'> 
                                <Link to='/login' className='nav-link'>Login</Link>
                                </div>
                                </> 
                    
                            ) : (
                                <>
                                <div className='nav-item d-md-none'> 
                                <button onClick={handleLogOut} className='nav-link'>Logout</button>
                                </div>

                                <div className='nav-item ms-2 d-none d-md-inline'> 
                                <button onClick={handleLogOut} className='btn btn-secondary'>Logout</button>
                                </div>
                        
                                <div className='nav-item'> 
                                <Link to='workoutBuilder' className='nav-link'>WorkoutBuilder</Link>
                                </div>
                                </>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navigations

