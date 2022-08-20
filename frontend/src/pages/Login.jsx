import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { name, email, password } = formData

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className="heading">
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
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login