import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { name, email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = 
    useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
          toast.error(message)
        }
    
        if(isSuccess || user){
          navigate('/')
        }
    
        // reset is in features/auth/authSlice. set variables back to false
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleDemoLogin = () => {
    dispatch(login({ email:"demo@demo.com", password: "demo" }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading authentication">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" className="form-control" id="email"
            name="email" value={email} placeholder="enter your email"
            onChange={handleChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password"
            name="password" value={password} placeholder="enter password"
            onChange={handleChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Log In
            </button>
          </div>
        </form>
        <button className="recipe-link" onClick={handleDemoLogin}>Demo Login</button>
      </section>
    </>
  )
}

export default Login