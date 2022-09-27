const express = require('express')
const router = express.Router()
const { 
        getRecipes, 
        createRecipe, 
        deleteRecipe,
    } = require('../controllers/recipeController')
const { protect } = require('../middleware/authMiddleware')

    router.route('/').get(protect, getRecipes).post(protect, createRecipe)
    router.route('/:id').delete(protect, deleteRecipe)

module.exports = router