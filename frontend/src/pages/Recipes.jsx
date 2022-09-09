import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getGroceries, reset } from '../features/groceries/grocerySlice'
import RecipeModal from '../components/RecipeModal'
import Axios from 'axios'
import Spinner from '../components/Spinner'

const Recipes = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  
  const { user } = useSelector((state) => state.auth)
  const { groceries, isLoading, isError, message } = useSelector((state) => state.groceries)

  const [checkedState, setCheckedState] = useState(
    new Array(groceries.length).fill(false)
  );

  useEffect(() => {
    if(isError) {
      console.log("error message:", message)
    } 
    if(!user){
      navigate('/login')
    }
    //fetch groceries if they're not yet in state, for example if user loads directly to this page
    if(groceries.length < 1){
      dispatch(getGroceries())
    } 

    return () => {
      dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  useEffect(() => {
    setCheckedState(new Array(groceries.length).fill(false))
  }, [groceries])
  
  let chosenIngredients = ''
  groceries.forEach((item, index) => {
    if(checkedState[index]){
      chosenIngredients += item.text + ' '
    }
  })

  let recipeTitles = null;

  const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY
  const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID

  const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`

  const getRecipesPage = async (searchUrl) => {
    // const searchUrl = `${url}&q=${ingredient}`;
    setLoading(true);
    setError(false);
    try {
      const result = await Axios.get(searchUrl);
      setRecipeData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  const handleCheckIngredient = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  if (recipeData) {
    recipeTitles = recipeData.hits.map((entry) => {
      return (
          <p className="recipe-names" onClick={() => setOpenModal(entry)} key={entry.recipe.uri}>{entry.recipe.label}</p>
      )
    });
  }

  return (
    <>
      {openModal && <RecipeModal recipeInfo={openModal} closeModal={()=>setOpenModal(null)} />} 
      <h1 className="recipe-heading">Recipe Finder</h1>
      <p className="recipe-caption">Check ingredient(s) you would like to find recipes with</p>
      <ul>
        {groceries.map((item, index) => (
            <li key={item._id}>
              <div className="recipe-grocery-list">
                <input
                  type="checkbox"
                  id={`checkbox-${item._id}`}
                  name={item.text}
                  value={item.text}
                  checked={checkedState[index]}
                  onChange={() => handleCheckIngredient(index)}
                />
                <label htmlFor={`checkbox-${item._id}`}>{item.text}</label>
              </div>
            </li>
        ))}
      </ul>
      {/* { chosenIngredients.length > 0 &&  */}
        <button disabled={chosenIngredients.length < 1} className="recipe-button" onClick={() => getRecipesPage(`${url}&q=${chosenIngredients}`)}>get recipes</button>
      {/* } */}
      {loading && <Spinner />}
      {recipeTitles && 
        <>
          {recipeTitles}
          {recipeData._links.next && <button className="recipe-button" onClick={()=>getRecipesPage(recipeData._links.next.href)}>more recipes</button>}
        </>}      
    </>
  )
}
export default Recipes