import {FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/')
  }

  return (
    <header className="header">
        <div className="logo">
            <Link to='/'>Grocery Getter</Link>
        </div>
        <ul>
        { user ? (
            <li>
                <a className="logout" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                </a>
            </li>
        ) : (
            <div className="auth-links">
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
            </div>
        )}  
        </ul>
        
    </header>
  )
}

export default Header