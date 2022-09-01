import { useSelector, useDispatch } from 'react-redux'

const Recipes = () => {
  const { groceries, isLoading, isError, message } = useSelector((state) => state.groceries)
  console.log(groceries)
  const list = groceries.map(item => (
      <p key={item._id}>{item.text}</p>
  ))
    console.log(list)
  return (
    <>
        <h1>Recipes</h1>
        <ul>{list}</ul>
        
    </>
  )
}
export default Recipes