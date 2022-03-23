const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const port = 3000

app.engine('.hbs', exhbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`localhost:${port} is running!`)
})


