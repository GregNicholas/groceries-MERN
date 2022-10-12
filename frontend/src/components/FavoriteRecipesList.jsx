import { deleteRecipe } from '../features/recipes/recipeSlice'
import { useState } from "react"
import { useDispatch } from "react-redux"
import RecipeModal from '../components/RecipeModal'
import Spinner from '../components/Spinner'
import { RiDeleteBin2Line } from "react-icons/ri"
import Axios from "axios"

const FavoriteRecipesList = ({ recipes }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [recipeData, setRecipeData] = useState(null)
    const [openModal, setOpenModal] = useState(null);

    const dispatch = useDispatch()

    const deleteItem = (id) => {
        dispatch(deleteRecipe(id))
    }

    const getRecipeInfo = async (searchUrl) => {
        setLoading(true)
        setError(false)
        try {
          const result = await Axios.get(searchUrl)
          setRecipeData(result.data);
          setLoading(false)
          setOpenModal(result.data)
        } catch (error) {
          console.log(error)
          setError(error)
        }
      }

  return (
    <>
        {loading && <Spinner />}
        {openModal && <RecipeModal recipeInfo={openModal} closeModal={()=>setOpenModal(null)} hideSave={true} />} 
        {recipes.map((recipe) => {
            return (
            <div key={recipe._id} className="recipe-favorite-title">
                <p onClick={() => getRecipeInfo(recipe.recipe)} className="recipe-names">{recipe.title}</p>
                <button onClick={() => deleteItem(recipe._id)} className="close" aria-label="close">
                    <RiDeleteBin2Line />
                </button>
            </div>
            )
        })}
    </>
  )
}
export default FavoriteRecipesList