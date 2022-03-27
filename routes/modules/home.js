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

module.exports = router