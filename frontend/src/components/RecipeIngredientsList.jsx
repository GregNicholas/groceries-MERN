const RecipeIngredientsList = ({groceries, handleClick, checkedState}) => {
  return (
    <ul className="recipe-ingredient-list">
        {groceries.map((item, index) => (
            <li key={item._id} className="recipe-grocery-item">
              <div>
                <input
                  type="checkbox"
                  id={`checkbox-${item._id}`}
                  name={item.text}
                  value={item.text}
                  checked={checkedState[index]}
                  onChange={() => handleClick(index)}
                />
                <label htmlFor={`checkbox-${item._id}`}>{item.text}</label>
              </div>
            </li>
        ))}
      </ul>
  )
}
export default RecipeIngredientsList