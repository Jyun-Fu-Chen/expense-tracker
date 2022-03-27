const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const { name, category, date, amount, } = req.body
  const userId = req.user._id
  Category.findOne({ name: category })
    .lean()
    .then(category => {
      return Record.create({
        name,
        date,
        amount,
        userId,
        categoryId: category._id
      })
    })
    .then(()=>res.redirect('/'))
})


module.exports = router