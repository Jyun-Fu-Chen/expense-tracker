const express = require('express')
const exhbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')


const app = express()
const port = 3000
require('./config/mongoose')

app.engine('.hbs', exhbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsExpenseTracker',
  resave: false,
  saveUninitialized: true
}))
app.use(routes)


app.listen(port, () => {
  console.log(`localhost:${port} is running!`)
})


