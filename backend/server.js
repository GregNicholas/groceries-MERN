const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8080
const cors = require('cors');

connectDB()

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/groceries', require('./routes/groceryRoutes'))
app.use('/api/recipes', require('./routes/recipeRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Server frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'../', 'frontend', 'dist', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))