// add to the post update route for checked status
// try drag n drop

import { useState } from 'react'
import { useDispatch } from "react-redux"
import { deleteGrocery } from "../features/groceries/grocerySlice"
import { FaCartArrowDown } from 'react-icons/fa'
import { FiSlash } from 'react-icons/fi'


const GroceryItem = ({grocery}) => {
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useDispatch()

  return (
    <div onClick={() => setIsChecked(prev => !prev)} aria-label="add to cart">
    <div className={isChecked ? 'checked grocery' : 'grocery' }>
        <div className="grocery-date">
            {new Date(grocery.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{grocery.text}</h2>
        
        <div className="add-to-cart"><FaCartArrowDown /></div>
        <button onClick={() => dispatch(deleteGrocery(grocery._id))} className="close" aria-label="close">
            <FiSlash />
        </button>
    </div>
    </div>

  )
}
export default GroceryItem