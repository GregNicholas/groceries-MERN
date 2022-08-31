// add to the post update route for checked status
// try drag n drop

import { useState } from 'react'
import { useDispatch } from "react-redux"
import { deleteGrocery, updateGrocery } from "../features/groceries/grocerySlice"
import { FaCartArrowDown } from 'react-icons/fa'
import { BsCartXFill, BsCartPlusFill } from 'react-icons/bs'
import { FiSlash } from 'react-icons/fi'

const GroceryItem = ({grocery}) => {
  const [isChecked, setIsChecked] = useState()
  const dispatch = useDispatch()

  const deleteItem = (e) => {
    e.stopPropagation()
    dispatch(deleteGrocery(grocery._id))
  }

  const addItemToCart = () => {
    dispatch(updateGrocery([grocery._id, {isInCart: !grocery.isInCart}]))
  }

  return (
    <div onClick={addItemToCart} aria-label="add to cart">
    <div className={grocery.isInCart ? 'checked grocery' : 'grocery' }>
        {!grocery.isInCart && <div className="grocery-date">
            {new Date(grocery.createdAt).toLocaleString('en-US')}
        </div>}
        <h2>{grocery.text}</h2>
        
        <div className="add-to-cart">
          {grocery.isInCart ? <BsCartXFill /> : <BsCartPlusFill />}
        </div>
        <button onClick={deleteItem} className="close" aria-label="close">
            <FiSlash />
        </button>
    </div>
    </div>
  )
}
export default GroceryItem