import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import Spinner from '../components/Spinner'

const Recipes = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  
  const { groceries, isLoading, isError, message } = useSelector((state) => state.groceries)
  const [checkedState, setCheckedState] = useState(
    new Array(groceries.length).fill(false)
  );
  
  let chosenIngredients = ''
  groceries.forEach((item, index) => {
    if(checkedState[index]){
      chosenIngredients += item.text + ' '
    }
  })
  console.log(chosenIngredients)

  let recipeTitles = null;

  const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY
  const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID

  const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`

  const getRecipesPage = async (searchUrl) => {
    // const searchUrl = `${url}&q=${ingredient}`;
    console.log("CUSTOM", searchUrl);
    setLoading(true);
    setError(false);
    try {
      const result = await Axios.get(searchUrl);
      console.log("res.data", result.data);
      console.log()
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

  // const list = groceries.map(item => (
  //     <li key={item._id}>
  //       <div ClassName="recipe-grocery-list">
  //         <input
  //           type="checkbox"
  //           id={`checkbox-${item._id}`}
  //           name={item.text}
  //           value={item.text}
  //           checked={checkedState[item._id]}
  //           onChange={() => handleCheckIngredient(item._id)}
  //         />
  //         <label htmlFor={`checkbox-${item._id}`}>{item.text}</label>
  //       </div>
  //     </li>
  // ))

  if (recipeData) {
    recipeTitles = recipeData.hits.map((entry) => {
      return <p key={entry.recipe.uri}>{entry.recipe.label}</p>;
    });
  }
console.log(checkedState)
  return (
    <>
      <h1>Recipes</h1>
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
      {loading && <Spinner />}
      {recipeTitles && 
        <>
          {recipeTitles}
          {recipeData._links.next && <button onClick={()=>getRecipesPage(recipeData._links.next.href)}>more recipes</button>}
        </>}
      { chosenIngredients.length > 0 && 
        <button onClick={() => getRecipesPage(`${url}&q=${chosenIngredients}`)}>get recipes</button>
      }
      
    </>
  )
}
export default Recipes