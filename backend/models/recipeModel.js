const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema(
    {
       user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
       },
       recipe: {
           type: String,
           required: [true, 'recipe link'],
       },
       mealType: {
           type: String,
           required: [true, 'lunch, dinner, breakfast, dessert'],
       }
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Recipe', recipeSchema)