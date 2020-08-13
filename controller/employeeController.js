const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')

// From Insert record form
router.get('/', (req, res) => {
    res.render('employee/addOrEdit',{
        viewTitle : 'Add Employee'
    })
})

// insert/Update Record Route
router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req,res)
    }else{
        updateRecord(req,res)
    }
})+

// listing record
router.get('/list', (req, res) => {
    Employee.find((err, doc) => {
        if (!err) {
            res.render('employee/listEmployee',{
                viewTitle : 'List Employee',
                list : doc
            })
        }else{
            console.log(`Error to listing Employee, Error : ${err}`)
        }
    })
})

// Get Record by Id for Update
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.render('employee/addOrEdit',{
                viewTitle : 'Edit Employee Information',
                employee : doc
            })
        }
    })
})

// Delete Record
router.get('/delete/:id', (req,res) => {
    Employee.findByIdAndRemove(req.params.id,(err,doc) => {
        if (!err) {
            Employee.find((err, doc) => {
                if (!err) {
                    res.render('employee/listEmployee',{
                        viewTitle : 'List Employee',
                        list : doc
                    })
                }else{
                    console.log(`Error to listing Employee, Error : ${err}`)
                }
            })
        }else{
            console.log(`Error while deleting record : ${err}`)
        }
    })
})
 
// Insert record function
function insertRecord(req, res){
    const employee = new Employee()
    employee.fullName = req.body.fullName
    employee.email = req.body.email
    employee.mobile = req.body.mobile
    employee.city = req.body.city
    
    employee.save( (err, doc) => {
        if(!err){
            res.redirect('employee/list')
        }else{
            if(err.name == 'ValidationError'){
                
                handleValidationError(err, req.body)

                res.render('employee/addOrEdit',{
                    viewTitle : 'Warning',
                    employee : req.body
                })
            }else{
                console.log(`Error during record insertion : ${err}`)
            }
        }
    })
}

// Update Record Function
function updateRecord(req,res) {
    Employee.findOneAndUpdate(req.body._id, req.body, {new:true}, (err, doc) => {
        if (!err) {
            res.redirect('employee/list')
        }else{
            if (err.name == 'validationError') {
                handleValidationError(err,req.body)
                res.render('employee/addOrEdit', {
                    viewTitle : 'Warning',
                    employee : req.body
                })
            }else{
                console.log(`Error during record the Update : ${err}`)
            }
        }
    })
}

// Handling error 
function handleValidationError(err, body) {
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName' :
                body.fullNameError = err.errors['fullName'].message
                break
            case 'email' :
                body.emailError = err.errors['email'].message
                break
            default :
                break
        }
    }
}

module.exports = router