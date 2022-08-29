import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGrocery } from '../features/groceries/grocerySlice'
import { FaPlusCircle } from 'react-icons/fa'

const GroceryForm = () => {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.length > 0){
            dispatch(createGrocery({ text }))
            setText('')
        }
        
    }
  return (
    <section className="form">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="text"></label>
                <input type="text" name="text" id="text" value={text} onChange={handleChange} placeholder="Add an item"/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">
                    <FaPlusCircle /> Add Item
                </button>
            </div>
        </form>
    </section> 
  )
}
export default GroceryForm

