const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const db = require('../../config/mongoose')


let recordData = [
  {
    name: '晚餐',
    category: '餐飲食品',
    amount: '1500',
    date:'2022-02-06'

  },
  {
    name: '看電影',
    category: '休閒娛樂',
    amount: '600',
    date: '2022-03-06'
  },
  {
    name: '搭計程車',
    category: '交通出行',
    amount: '600',
    date: '2022-03-06'
  }
]
db.once('open', () => {
  User.create({
    username: 'user123',
    password: '123',
  })
    .then(user => {
      const userId = user._id
      Promise.all(Array.from(recordData, data => {
        return Category.findOne({ name: data.category })
          .then(category => {
            return Record.create({
              name: data.name,
              amount: data.amount,
              date: data.date,
              userId,
              categoryId: category._id
            })
          })

      })).then(() => {
        console.log('done!!')
        process.exit()
      })
    })
})