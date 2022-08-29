import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
          navigate('/login')
        }
      }, [user])
  return (
    <>
        <h1>User Profile</h1>
        <p>Current User is {user.name}</p>
        <Link to='/'>{user.name}'s Groceries</Link>
    </>
  )
}
export default ProfilePage