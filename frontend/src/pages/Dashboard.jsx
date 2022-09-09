import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GroceryForm from '../components/GroceryForm'
import Spinner from '../components/Spinner'
import GroceryItem from '../components/GroceryItem'
import { getGroceries, reset } from '../features/groceries/grocerySlice'
import { BiHide, BiShow, BiSortAZ, BiSortDown } from 'react-icons/bi'

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
    if(!sortChecked && !filterChecked){
      setFilteredGroceries(groceries)
    }
  }, [isLoading])

  useEffect(() => {
    console.log("useeffect ")
      if(filterChecked && !sortChecked){
          const newList = groceries.filter(item => {
          return !item.isInCart 
        })
        setFilteredGroceries(newList)
      } else if(sortChecked && !filterChecked) {
        const newList = [...groceries].sort((a,b) => {
          if (a.text.toLowerCase() > b.text.toLowerCase()){
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
          if (a.text.toLowerCase() > b.text.toLowerCase()){
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
    
  }, [filterChecked, sortChecked, groceries])

  if (!filteredGroceries){
    return <Spinner />
  }

  return (
    <>
      <section className="heading hero">
        <h2>{greeting} {user && user.name}</h2>
      </section>
      <h1>Grocery List</h1>
      {groceries.length > 0 && (
        <Link className="recipe-link" to='/recipes'>
            Explore Recipes
        </Link>
      )}
      
      <GroceryForm />

      <div className="filter-buttons">
        <button 
          className="btn btn-filter"
          onClick={() => setFilterChecked(prev => !prev)}
        >{ !filterChecked ? <><BiHide />Hide Checked</> : <><BiShow />Show All</>}</button>
        <button 
          className="btn btn-filter"
          onClick={() => setSortChecked(prev => !prev)}
        >{ !sortChecked ? <><BiSortAZ />Sort Alphabetical</> : <><BiSortDown />Sort By Added</>}</button>
      </div>

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