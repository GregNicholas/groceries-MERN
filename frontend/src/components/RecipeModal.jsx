import { CgCloseO, CgHeart, CgPlayListAdd } from 'react-icons/cg'
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { useDispatch } from 'react-redux'
import { createGrocery } from '../features/groceries/grocerySlice'
import { createRecipe } from '../features/recipes/recipeSlice'
import ModalContainer from './ModalContainer'

const RecipeModal = ({recipeInfo, closeModal}) => {
    console.log(recipeInfo)
  const dispatch = useDispatch()

  const addIngredients = () => {    
    recipeInfo.recipe.ingredients.forEach(ingredient => {
        dispatch(createGrocery({ text: ingredient.food }))
    })
    closeModal()
  }

  const addToFavorites = () => {
    if(recipeInfo.recipe.label.length > 0){
        console.log("ADD Recipe: ", recipeInfo.recipe.label, recipeInfo._links.self.href)
        dispatch(createRecipe({ 
                recipe: recipeInfo._links.self.href,
                title: recipeInfo.recipe.label,
                mealType: recipeInfo.recipe.dishType[0]
            }))
    }
  }

  return (
    <ModalContainer closeModal={closeModal}>
        <div className="recipe-actions">
            <div onClick={addToFavorites} className="recipe-favorite"><TiHeartOutline /><span className="icon-text">SAVE</span></div>
            <div onClick={addIngredients} className="recipe-favorite"><CgPlayListAdd /><span className="icon-text">ADD ITEMS TO LIST</span></div>
            <CgCloseO className="close-button" onClick={closeModal} />
        </div>
        <h1 className="recipe-title">{recipeInfo.recipe.label}</h1>
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
export default RecipeModal