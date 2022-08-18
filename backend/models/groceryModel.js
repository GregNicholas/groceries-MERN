const mongoose = require('mongoose')

const grocerySchema = mongoose.Schema(
    {
       name: {
           type: String,
           required: [true, 'Please add name value'],
       },
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Grocery', grocerySchema)