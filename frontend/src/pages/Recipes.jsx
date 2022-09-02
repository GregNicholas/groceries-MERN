import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import Spinner from '../components/Spinner'

const Recipes = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  let recipeTitles = null;

  const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY
  const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID

  console.log("APP KEY: ", APP_KEY)
  const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`

  const { groceries, isLoading, isError, message } = useSelector((state) => state.groceries)

  const getRecipes = async (ingredient) => {
    const searchUrl = `${url}&q=${ingredient}`;
    console.log("CUSTOM", searchUrl);
    setLoading(true);
    setError(false);
    try {
      const result = await Axios.get(searchUrl);
      console.log(result.data);
      setRecipeData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  const list = groceries.map(item => (
      <p key={item._id}>{item.text}</p>
  ))

  if (recipeData) {
    recipeTitles = recipeData.hits.map((entry) => {
      return <p key={entry.recipe.uri}>{entry.recipe.label}</p>;
    });
  }

  return (
    <>
      <h1>Recipes</h1>
      <ul>{list}</ul>
      {loading && <Spinner />}
      {recipeTitles && recipeTitles}
      <button onClick={() => getRecipes(groceries[1].text)}>get recipes</button>
    </>
  )
}
export default Recipes