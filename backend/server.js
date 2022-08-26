const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 2121
const cors = require('cors');

connectDB()

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/groceries', require('./routes/groceryRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))