import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGrocery } from '../features/groceries/grocerySlice'
import { FaPlusCircle } from 'react-icons/fa'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GroceryForm = ({groceries}) => {
    const [text, setText] = useState('')

    const groceryList = groceries.map(item => item.text)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!groceryList.includes(text)){
            console.log("ADD: ", text)
            if(text.length > 0){
                dispatch(createGrocery({ text }))
                setText('')
            }
        } else {
            toast.error('Item already in list!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
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

