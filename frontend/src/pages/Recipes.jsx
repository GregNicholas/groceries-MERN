import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'

const Recipes = () => {
  const APP_KEY = import.meta.env.EDAMAM_APP_KEY
  const APP_ID = import.meta.env.EDAMAM_APP_ID
console.log(APP_KEY)
  const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`

  const { groceries, isLoading, isError, message } = useSelector((state) => state.groceries)

  const getRecipes = async (ingredient) => {
    const custom = `${url}&q=${ingredient}`
    console.log("CUSTOM", custom)
    const result = await Axios.get()
    console.log(result.data)
  }
  const list = groceries.map(item => (
      <p key={item._id}>{item.text}</p>
  ))
    console.log(list)
  return (
    <>
        <h1>Recipes</h1>
        <ul>{list}</ul>
        <button onClick={getRecipes}>get recipes</button>
    </>
  )
}
export default Recipes