const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get('/',(req,res,next)=>{
    res.status(200).json({message:'welcome to my app'})
})

app.use((err,req,res,next)=>{
    let status = 500
    let message = { message: 'internal server error' }
    switch (err.name) {
        case 'SequelizeValidationError':
            const errors = []
            err.errors.forEach(error => {
              errors.push(error.message)
            })
            message = {
              message: 'Bad Request',
              errors
            }
            status = 400
            res.status(status).json(message)
        break;
    
        default:
            res.status(status).json(message)
        break;
    }
})

module.exports = app

