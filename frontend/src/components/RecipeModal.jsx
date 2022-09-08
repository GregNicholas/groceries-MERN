const RecipeModal = ({recipeInfo, closeModal}) => {
    console.log(recipeInfo)
  return (
    <div 
        onClick={closeModal} 
        className="modal-background"
    >
        <div onClick={e=>e.stopPropagation()} className="recipe-card">
            <h1 className="recipe-title">{recipeInfo.recipe.label}</h1>
            <div className="recipe-body">
                <div class="recipe-image-container">
                    <img className="recipe-image" src={recipeInfo.recipe.image} alt={recipeInfo.recipe.label} />
                </div>
                <ul>
                    {recipeInfo.recipe.ingredientLines.map(ing => {
                        return <li className="recipe-ingredient" key="ing">{ing}</li>
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
}
export default RecipeModal