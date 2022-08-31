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
  const [filteredGroceries, setFilteredGroceries] = useState(null);

  const time = new Date().getHours()
  const greeting = time < 12 ? "Good morning, " : time < 18 ? "Good afternoon, " : "Good evening, "

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
    if(filteredGroceries) {
      // let newList = [...filteredGroceries]
      if(filterChecked && !sortChecked){
          const newList = groceries.filter(item => {
          return !item.isInCart 
        })
        setFilteredGroceries(newList)
      } else if(sortChecked && !filterChecked) {
        const newList = [...groceries].sort((a,b) => {
          if (a.text > b.text){
            return 1 
          } else {
            return -1
          }
        })
        setFilteredGroceries(newList)
      } else if(sortChecked && filterChecked){
        const newList = [...groceries].filter(item => {
          return !item.isInCart 
        }).sort((a,b) => {
          if (a.text > b.text){
            return 1 
          } else {
            return -1
          }
        })
        setFilteredGroceries(newList)
      }
      if(!filterChecked && !sortChecked) {
        setFilteredGroceries(groceries)
      }
    }
    
  }, [filterChecked, sortChecked])

  const handleFilterCheck = () => {
    setFilterChecked(prev => !prev)
  }

  const handleSortCheck = () => {
    console.log("sort")
    setSortChecked(prev => !prev)
  }

  if (!filteredGroceries){
    return <Spinner />
  }

  return (
    <>
      <section className="heading hero">
        <h1>{greeting} {user && user.name}</h1>
      </section>

      <label className="label" htmlFor="filter">Hide checked</label>
      <input 
        type="checkbox" 
        id="filter" 
        checked={filterChecked} 
        onChange={handleFilterCheck}
      />

      <label className="label" htmlFor="sort">Sort list</label>
      <input 
        type="checkbox" 
        id="sort" 
        checked={sortChecked} 
        onChange={handleSortCheck}
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