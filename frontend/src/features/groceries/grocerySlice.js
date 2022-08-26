import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import groceryService from './groceryService'

const initialState = {
    groceries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create Grocery Item
export const createGrocery = 
    createAsyncThunk('groceries/create', 
    async (groceryData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await groceryService.createGrocery(groceryData, token)
        } catch (err) {
            console.log("ERROR: ", err)
            const message = 
                (err.response && 
                  err.response.data && 
                  err.response.data.message) || 
                err.message || 
                err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

export const getGroceries = createAsyncThunk('groceries/getAll', async (_, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await groceryService.getGroceries(token)
    } catch (err) {
        console.log("ERROR: ", err)
            const message = 
                (err.response && 
                  err.response.data && 
                  err.response.data.message) || 
                err.message || 
                err.toString()
            return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGrocery = createAsyncThunk('groceries/delete', async(id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await groceryService.deleteGrocery(id, token)
  } catch (err) {
        console.log("ERROR: ", err)
            const message = 
                (err.response && 
                  err.response.data && 
                  err.response.data.message) || 
                err.message || 
                err.toString()
            return thunkAPI.rejectWithValue(message)
  }
})

export const grocerySlice = createSlice({
    name: 'grocery',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
          .addCase(createGrocery.pending, (state) => {
              state.isLoading = true
          })
          .addCase(createGrocery.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.groceries.push(action.payload)
          })
          .addCase(createGrocery.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getGroceries.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getGroceries.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.groceries = action.payload
          })
          .addCase(getGroceries.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(deleteGrocery.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteGrocery.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.groceries = state.groceries.filter((grocery) => {
              return grocery._id !== action.payload.id})
          })
          .addCase(deleteGrocery.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    }
})

export const { reset } = grocerySlice.actions
export default grocerySlice.reducer