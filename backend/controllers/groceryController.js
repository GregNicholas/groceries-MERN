const asyncHandler = require('express-async-handler')

const Grocery = require('../models/groceryModel')
const User = require('../models/userModel')

// @desc Get Groceries
// @route GET /api/groceries
// @access Private
const getGroceries = asyncHandler(async (req, res) => {
    const groceries = await Grocery.find({ user: req.user.id})
    res.status(200).json(groceries)
})

// @desc Set grocery
// @route POST /api/groceries
// @access Private
const createGrocery = asyncHandler(async (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please add a valid name field')
    }

    const grocery  = await Grocery.create({
        name: req.body.name,
        user: req.user.id
    })

    res.status(200).json(grocery)
})

// @desc Update Grocery
// @route PUT /api/groceries/:id
// @access Private
const updateGrocery = asyncHandler(async (req, res) => {
    const grocery = await Grocery.findById(req.params.id)

    if(!grocery){
        res.status(400)
        throw new Error('Grocery item not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('user not found')
    }

    // make sure the logged in user matches grocery user
    if(grocery.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedGrocery = 
        await Grocery.findByIdAndUpdate(req.params.id, req.body, 
            {
                new: true,
            })

    res.status(200).json(updatedGrocery)
})

// @desc Delete grocery
// @route DELETE /api/groceries/:id
// @access Private
const deleteGrocery = asyncHandler(async (req, res) => {
    const grocery = await Grocery.findById(req.params.id)

    if(!grocery){
        res.status(400)
        throw new Error('Grocery item not found')
    }
    
    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('user not found')
    }

    // make sure the logged in user matches grocery user
    if(grocery.user.toString() !== user.id){
        res.status(401)
        throw new Error(`user not authorized`)
    }

    await grocery.deleteOne()

    res.status(200).json({message: `Delete grocery id: ${req.params.id}`})
})

module.exports = {
    getGroceries, createGrocery, updateGrocery, deleteGrocery
}