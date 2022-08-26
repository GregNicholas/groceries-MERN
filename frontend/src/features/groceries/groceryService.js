import axios from 'axios'

// axios.defaults.baseURL = `http://localhost:2121`
const API_URL = '/api/groceries/'

const createGrocery = async (groceryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, groceryData, config)
    return response.data
}

const getGroceries = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const deleteGrocery = async (groceryId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + groceryId, config)
    return response.data
}

const groceryService = {
    createGrocery,
    getGroceries,
    deleteGrocery,
}

export default groceryService