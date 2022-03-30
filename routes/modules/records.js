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
    .then(() => res.redirect('/'))
    .catch(() => console.error(error))
})
router.get('/:id/edit', (req, res) => {
  const editId = req.params.id
  Record.findById(editId)
    .populate('categoryId')
    .lean()
    .then(record => {
      //類別判斷尚未處理完成
      res.render('edit', { record })
    })
    .catch(err => console.error(err))
})
router.post('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount } = req.body
  Category.findOne({ name: category })
    .then(category => {
      Record.findOne({ userId, _id })
        .then(record => {
          record.name = name,
            record.date = date,
            record.amount = amount,
            record.categoryId = category._id
          return record.save()
        })

        .then(() => res.redirect('/'))
        .catch(err => console.error(err))
    })
})

module.exports = router