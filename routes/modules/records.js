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
      const recordCategory = record.categoryId.name
      const otherCategory = []
      Category.find()
        .then(categories => {
          categories.filter(category => {
            if (category.name !== recordCategory) {
              return otherCategory.push(category.name)
            }
          })
        })
        .then(() => res.render('edit', { record, recordCategory, otherCategory }))
    })
    .catch(err => console.error(err))
})
router.put('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount } = req.body
  Category.findOne({ name: category })
    .lean()
    .then(category => {
      if (category === null) {
        req.flash('warning_msg', '請點選類別欄位')
        return res.redirect(`/records/${_id}/edit`)
      }
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
router.delete('/:id/delete', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.deleteOne({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))

})

module.exports = router