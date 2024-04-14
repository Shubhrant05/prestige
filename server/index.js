import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config() //used to load environment variables from a .env file into process.env

const app = express();
const PORT = 4000;

//Connecting to MONGODB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB connected')
}).catch((err) => {
    console.log('DB connection error', err)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})