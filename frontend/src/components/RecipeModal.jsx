const RecipeModal = ({recipeInfo, closeModal}) => {
  return (
    <div 
        onClick={closeModal} 
        className="modal-background"
    >
        <div onClick={e=>e.stopPropagation()} class="modal-card">
            {recipeInfo.recipe.label}
        </div>
    </div>
  )
}
export default RecipeModal