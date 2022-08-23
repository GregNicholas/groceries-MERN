import axios from 'axios'

// we put a proxy in frontend package.json so it will use
// for example http://localhost/2121/API_URL
// proxy needs some additional configuration for vite. using axios.defaults.baseURL for now
axios.defaults.baseURL = `http://localhost:2121`
const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService