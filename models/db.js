const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser : true, useUnifiedTopology : true }, (err) => {
        if(!err) {
            console.log('MongoDB connection is succes')
        }
        else {
            console.log('MongoDB connection is failed')
        }
    })
} 


require('./employee.model')
module.exports = connectDB