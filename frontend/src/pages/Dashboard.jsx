import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GroceryForm from '../components/GroceryForm'
import Spinner from '../components/Spinner'
import GroceryItem from '../components/GroceryItem'
import { getGroceries, reset } from '../features/groceries/grocerySlice'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { groceries, isLoading, isError, message } = useSelector((state) => state.groceries)
  
  const [filterChecked, setFilterChecked] = useState(false);
  const [sortChecked, setSortChecked] = useState(false);
  const [filteredGroceries, setFilteredGroceries] = useState([]);

  useEffect(() => {
    if(isError) {
      console.log("error message:", message)
    } 
    if(!user){
      navigate('/login')
    }

    dispatch(getGroceries())

    return () => {
      dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  useEffect(() => {
    setFilteredGroceries(groceries)
  }, [isLoading])

  useEffect(() => {
    if(filterChecked){
      console.log(filteredGroceries)
      const filtered = filteredGroceries.filter(item => {
        console.log("filtereing....", item)
        return item.isInCart 
      })
      setFilteredGroceries(filtered)
    } else {
      setFilteredGroceries(groceries)
    }
  }, [filterChecked, sortChecked])

  const handleFilterCheck = () => {
    setFilterChecked(prev => !prev)
  }

  // if (isLoading){
  //   return <Spinner />
  // }
  console.log(filteredGroceries)
  return (
    <>
      <section className="heading hero">
        <h1>Welcome {user && user.name}</h1>
        <p>Groceries Dashboard</p>
      </section>
      <label htmlFor="filter">Show unchecked</label>
      <input 
        type="checkbox" 
        id="filter" 
        checked={filterChecked} 
        onChange={handleFilterCheck}
      />
      <GroceryForm />

      <section className="content">
        {filteredGroceries.length > 0 ? (
          <div className="groceries">
          {filteredGroceries.map(grocery => {
            return <GroceryItem key={grocery._id} grocery={grocery} />
          })}
          </div>
        ) : (<h3>Your list is empty</h3>) 
        }
      </section>
    </>
  )
}

export default Dashboard