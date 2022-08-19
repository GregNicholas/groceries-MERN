const mongoose = require('mongoose')

const grocerySchema = mongoose.Schema(
    {
       user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
       },
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