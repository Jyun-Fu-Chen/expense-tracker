const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => {
        totalAmount += Number(record.amount)
      })
      return res.render('home', { records, totalAmount })
    })
})
router.post('/category', (req, res) => {
  const category = req.body.category
  const userId = req.user._id
  if(category === '全部'){
    return res.redirect('/')
  }
  Category.findOne({ name: category })
    .then(category => {
      console.log(category)
      const categoryId = category._id
      Record.find({ userId, categoryId })
      .populate('categoryId')
        .lean()
        .then(records => {
          console.log(records)
          let totalAmount = 0
          records.map(record => totalAmount += Number(record.amount))
          res.render('home', { records, totalAmount })
        })
    })
})

module.exports = router