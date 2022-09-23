const express = require('express')
const router = express.Router()
const { 
        getGroceries, 
        createGrocery, 
        updateGrocery, 
        deleteGrocery,
        deleteAllGroceries
    } = require('../controllers/groceryController')
const { protect } = require('../middleware/authMiddleware')

    router.route('/').get(protect, getGroceries).post(protect, createGrocery).delete(protect, deleteAllGroceries)
    router.route('/:id').put(protect, updateGrocery).delete(protect, deleteGrocery)

module.exports = router