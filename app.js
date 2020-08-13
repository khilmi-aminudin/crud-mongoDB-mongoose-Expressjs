const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./models/db')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()

// init Databse to index
db()

// JSON Body-Parser
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.engine('hbs', exphbs({ extname : 'hbs' ,handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home')
})
// Init employee Controller
app.use('/employee', require('./controller/employeeController'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App is running on port : ${PORT}`))