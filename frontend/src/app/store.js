import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import groceryReducer from '../features/groceries/grocerySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        groceries: groceryReducer,
    },
})