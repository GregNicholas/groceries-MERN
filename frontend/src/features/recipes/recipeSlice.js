import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recipeService from './recipeService'

const initialState = {
    recipes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create Recipe Item
export const createRecipe = 
    createAsyncThunk('recipes/create', 
    async (recipeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await recipeService.createRecipe(recipeData, token)
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

export const getRecipes = createAsyncThunk('recipes/getAll', async (_, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await recipeService.getRecipes(token)
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

export const updateRecipe = createAsyncThunk('recipe/update', async(updateData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await recipeService.updateRecipe(updateData, token)
  } catch (err) {
      const message = 
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
          err.message ||
          err.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const deleteRecipe = createAsyncThunk('recipes/deleteAll', async(id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await recipeService.deleteRecipe(id, token)
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


export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        resetRecipes: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
          .addCase(createRecipe.pending, (state) => {
              state.isLoading = true
          })
          .addCase(createRecipe.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.recipes.push(action.payload)
          })
          .addCase(createRecipe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getRecipes.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getRecipes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.recipes = action.payload
          })
          .addCase(getRecipes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(deleteRecipe.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteRecipe.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.recipes = state.recipes.filter((recipe) => {
              return recipe._id !== action.payload.id})
          })
          .addCase(deleteRecipe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    }
})

export const { resetRecipes } = recipeSlice.actions
export default recipeSlice.reducer