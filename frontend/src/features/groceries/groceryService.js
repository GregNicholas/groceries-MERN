import axios from 'axios'

// axios.defaults.baseURL = `http://localhost:2121`
const API_URL = '/api/groceries/'

// Create new grocery item
const createGrocery = async (groceryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log("groacery service before post: ", groceryData)
    const response = await axios.post(API_URL, groceryData, config)
    console.log("groceryService creaete groceryData: ", response.data)
    return response.data
}

// get groceries 
const getGroceries = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const groceryService = {
    createGrocery,
}

export default groceryService