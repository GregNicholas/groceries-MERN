import { CgCloseO, CgHeart, CgPlayListAdd } from 'react-icons/cg'
import { useDispatch } from 'react-redux'
import { createGrocery } from '../features/groceries/grocerySlice'

const RecipeModal = ({recipeInfo, closeModal}) => {
    
  const dispatch = useDispatch()

  const addIngredients = () => {    
    recipeInfo.recipe.ingredientLines.forEach(ingredient => {
        dispatch(createGrocery({ text: ingredient }))
    })
    closeModal()
  }

  return (
    <div 
        onClick={closeModal} 
        className="modal-background"
    >
        <div onClick={e=>e.stopPropagation()} className="recipe-card">
            <div className="recipe-actions">
                <div className="recipe-favorite"><CgHeart /><span className="icon-text">SAVE</span></div>
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
        </div>
    </div>
  )
}
export default RecipeModal