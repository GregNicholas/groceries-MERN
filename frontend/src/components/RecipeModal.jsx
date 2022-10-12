import { CgCloseO, CgHeart, CgPlayListAdd } from 'react-icons/cg'
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { FiExternalLink } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { createGrocery } from '../features/groceries/grocerySlice'
import { createRecipe } from '../features/recipes/recipeSlice'
import ModalContainer from './ModalContainer'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeModal = ({recipes, recipeInfo, closeModal, hideSave }) => {
  const dispatch = useDispatch()
  const groceries = useSelector((state) => state.groceries)

  const recipeLink = recipeInfo._links.self.href
  const isFavorite = recipes?.findIndex(recipe => recipe.recipe === recipeLink) > -1 ? true : false

  const addIngredients = () => {  
    //filter ingredients so duplicates aren't added
    const groceryList = groceries.groceries.map(item => item.text)  
    
    const newIngredients = recipeInfo.recipe.ingredients.filter(item => {
        return !groceryList.includes(item.food)
    })

    newIngredients.forEach(ingredient => {
        dispatch(createGrocery({ text: ingredient.food }))
    })
    toast.success('Added ingredients to list', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }

  const addToFavorites = () => {
    if (isFavorite){
        console.log("RECIPE EXISTS")
    } else {
        if(recipeInfo.recipe.label.length > 0){
            dispatch(createRecipe({ 
                recipe: recipeInfo._links.self.href,
                title: recipeInfo.recipe.label,
                mealType: recipeInfo.recipe.dishType[0]
            }))
        }
        toast.success('Added to Favorites!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  }
console.log(recipeInfo)
  return (
    <ModalContainer closeModal={closeModal}>
        <div className="recipe-actions">
            {!hideSave && <div onClick={addToFavorites} className="recipe-favorite">
                { isFavorite ? <TiHeartFullOutline /> : <TiHeartOutline /> }
                <span className="icon-text">
                    { isFavorite ? "SAVED" : "SAVE" }
                </span>
                </div>}
            <div onClick={addIngredients} className="recipe-favorite"><CgPlayListAdd /><span className="icon-text">ADD ITEMS TO LIST</span></div>
            <CgCloseO className="close-button" onClick={closeModal} />
        </div>
        <h1 className="recipe-title">{recipeInfo.recipe.label}</h1>
        <a href={recipeInfo.recipe.url} className="recipe-favorite-title external-link" target="_blank"><FiExternalLink /> Open Full Recipe</a>
        <div className="recipe-body">
            <div className="recipe-image-container">
                <img className="recipe-image" src={recipeInfo.recipe.image} alt={recipeInfo.recipe.label} />
            </div>
            <ul>
                {recipeInfo.recipe.ingredientLines.map((ing, i) => {
                    return <li className="recipe-ingredient" key={i}>{ing}</li>
                })}
            </ul>
        </div>
    </ModalContainer>
  )
}

RecipeModal.defaultProps = {
    hideSave: false
  }

export default RecipeModal