import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getGroceries, reset } from '../features/groceries/grocerySlice'
import { getRecipes, resetRecipes } from '../features/recipes/recipeSlice'
import RecipeModal from '../components/RecipeModal'
import RecipeIngredientsList from '../components/RecipeIngredientsList'
import FavoriteRecipesList from '../components/FavoriteRecipesList'
import Spinner from '../components/Spinner'
import Axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const Recipes = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const { user } = useSelector((state) => state.auth)
  const { groceries, isLoading, isError, message } = useSelector((state) => state.groceries)
  const { recipes, isRecipesLoading, isRecipesError, recipesMessage } = useSelector((state) => state.recipes)
  const [checkedState, setCheckedState] = useState(
    new Array(groceries.length).fill(false)
  );

  let recipeTitles = null;
  const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY
  const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID
  // keys for deployment on heroku not working. VITE issue?
   const app_keyy = process.env.VITE_EDAMAM_APP_KEY
  const app_idd = process.env.VITE_EDAMAM_APP_ID
  console.log("ENVIRONMENT VARIABLES: ", app_keyy, app_idd)
  // const APP_KEY = "4fcb252b75864cec9d67d4bcadde52ee"
  // const APP_ID = "e6f2ebdf"
  const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`

  useEffect(() => {
    if(isError) {
      console.log("error message:", message)
    } 
    if(isRecipesError){
      console.log("Recipe error: ", recipesMessage)
    }

    if(!user){
      navigate('/login')
    }
    //fetch groceries if they're not yet in state, for example if user loads directly to this page
    if(groceries.length < 1){
      dispatch(getGroceries())
    } 

    dispatch(getRecipes())

    return () => {
      dispatch(reset)
      dispatch(resetRecipes)
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

  const getRecipesPage = async (searchUrl) => {
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
          <motion.p 
            key={entry.recipe.uri}
            className="recipe-names search-list" 
            onClick={() => setOpenModal(entry)} 
            initial={{x: "-100%", scale: 0}}
            animate={{x: 0, scale: 1}}
            transition={{ type: "tween" }}
          >
            {entry.recipe.label}
          </motion.p>
      )
    });
  }

  return (
    <>
      <AnimatePresence>
      {openModal && <RecipeModal recipes={recipes} recipeInfo={openModal} closeModal={()=>setOpenModal(null)} />} 
      </AnimatePresence>
      {loading && <Spinner />}
      <button className="recipe-button" onClick={() => setShowFavorites(prev => !prev)}>
        {showFavorites ? "Recipe Finder" : "Show Favorites"}
      </button>
      {showFavorites ? 
        <div className="recipe-favorites">
          <h1 className="recipe-heading">My Favorite Recipes</h1>
          <FavoriteRecipesList recipes={recipes} />
        </div>
        :
        <div className="recipe-finder">
          <h1 className="recipe-heading">Recipe Finder</h1>
          <p className="recipe-caption">Check ingredient(s) you would like to find recipes with</p>
            <RecipeIngredientsList groceries={groceries} handleClick={handleCheckIngredient} checkedState={checkedState} />
            <button disabled={chosenIngredients.length < 1} className="recipe-button" onClick={() => getRecipesPage(`${url}&q=${chosenIngredients}`)}>get recipes</button>
            {recipeTitles && 
              <>
              <div className="recipe-names">
                {recipeTitles}
              </div>
                {recipeData._links.next && <button className="recipe-button" onClick={()=>getRecipesPage(recipeData._links.next.href)}>more recipes</button>}
              </>}   
        </div>
      }
    </>
  )
}
export default Recipes