const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')


const app = express()
const port = 3000

app.engine('.hbs', exhbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use(session({
  secret: 'ThisIsExpenseTracker',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)


app.listen(port, () => {
  console.log(`localhost:${port} is running!`)
})


