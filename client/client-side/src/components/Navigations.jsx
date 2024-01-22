import { Link, useNavigate } from 'react-router-dom'
import '../index.css'
import { updateToken } from '../actions/actionsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Navigations = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((it) => it.actionsSlice.token);

    //const handleLogOut = () => {
        //dispatch(updateToken(''))
        //navigate('/login')
    //}

    return (
        <div className='navBar'>
            <Link to='/'>Home</Link>
            <Link to='/exercises'>Exercise Library</Link>
            <Link to='/register'>Register</Link>
        </div>
    )
};

export default Navigations

