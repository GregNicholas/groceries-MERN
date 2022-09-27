const asyncHandler = require('express-async-handler')

const Recipe = require('../models/recipeModel')
const User = require('../models/userModel')

// @desc Get Recipes
// @route GET /api/recipes
// @access Private
const getRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({ user: req.user.id})
    res.status(200).json(recipes)
})

// @desc Set recipe
// @route POST /api/recipes
// @access Private
const createRecipe = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Not a valid recipe')
    }

    const grocery  = await Recipe.create({
        recipe: req.body.recipe,
        user: req.user.id,
        mealType: req.body.mealType,
    })

    res.status(200).json(grocery)
})

// @desc Delete recipe
// @route DELETE /api/recipes/:id
// @access Private
const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if(!recipe){
        res.status(400)
        throw new Error('Recipe not found')
    }
    
    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('user not found')
    }

    // make sure the logged in user matches recipe user
    if(grocery.user.toString() !== req.user.id){
        res.status(401)
        throw new Error(`user not authorized`)
    }

    await recipe.deleteOne()

    res.status(200).json({id: `${req.params.id}`})
})

module.exports = {
    getRecipes, createRecipe, deleteRecipe
}