import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaUser } from 'react-icons/fa'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { name, email, password, confirmPassword } = formData

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

  const handleSubmit = (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
      toast.error('passowords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading authentication">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="name"
            name="name" value={name} placeholder="enter your name"
            onChange={handleChange}/>
          </div>
          <div className="form-group">
            <input type="email" className="form-control" id="email"
            name="email" value={email} placeholder="enter your email"
            onChange={handleChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password"
            name="password" value={password} placeholder="enter a password"
            onChange={handleChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="confirmPassword"
            name="confirmPassword" value={confirmPassword} placeholder="confirm password"
            onChange={handleChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register