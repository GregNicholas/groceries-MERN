import { useDispatch } from "react-redux"
import { deleteGrocery } from "../features/groceries/grocerySlice"

const GroceryItem = ({grocery}) => {
  const dispatch = useDispatch()

  return (
    <div className="grocery">
        <div>
            {new Date(grocery.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{grocery.text}</h2>
        <button onClick={() => dispatch(deleteGrocery(grocery._id))} className="close">
            X
        </button>
    </div>
  )
}
export default GroceryItem