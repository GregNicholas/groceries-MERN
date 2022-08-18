const express = require('express')
const router = express.Router()
const { 
        getGroceries, 
        createGrocery, 
        updateGrocery, 
        deleteGrocery 
    } = require('../controllers/groceryController')

    router.route('/').get(getGroceries).post(createGrocery)
    router.route('/:id').put(updateGrocery).delete(deleteGrocery)

module.exports = router