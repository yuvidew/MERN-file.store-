require('dotenv').config();
const express = require('express')
const cors = require('cors');
const connectDb = require('./db/connect');
const router = require('./router/router');

const app = express()
const port = 2000;

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())

app.get('/' , async (req , res) => {
    return res.status(200).json({
        msg : 'hello from server'
    })
})

app.use('/api' , router)

const start = async () => {
    try {
        await connectDb(process.env.MDB_URL)
        app.listen(port , () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()