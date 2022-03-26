const mongoose = require('mongoose')
const Category = require('../category')
const db = require('../../config/mongoose')

const categoryList = [
  '家居物業',
  '交通出行',
  '休閒娛樂',
  '餐飲食品',
  '其他'
]

db.once('open', () => {
  //建立category資料Ｆ
  for (let i = 0; i < categoryList.length; i++) {
    Category.create({
      name: categoryList[i]
    })
  }
  //建立user資料
  //建立record資料
})
