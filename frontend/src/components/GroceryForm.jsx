import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGrocery } from '../features/groceries/grocerySlice'

const GroceryForm = () => {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(createGrocery({ text }))
        setText('')
    }
  return (
    <section className="form">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="text">Grocery Item</label>
                <input type="text" name="text" id="text" value={text} onChange={handleChange} />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">
                    Add Item
                </button>
            </div>
        </form>
    </section> 
  )
}
export default GroceryForm

