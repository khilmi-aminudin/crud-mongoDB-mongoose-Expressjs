const mongoose = require('mongoose')
const schema = mongoose.Schema

const employeSchema = new schema({
    fullName : {
        type : String,
        required : 'This field is required'
    },
    email : {
        type : String,
        required : 'This field is required'
    },
    mobile : {
        type : String
    },
    city : {
        type : String
    }
})

employeSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
 }, 'Email format is wrong')

 mongoose.model('Employee', employeSchema)