const mongoose = require('mongoose')
const Category = require('../category')
const db = require('../../config/mongoose')

const categoryList = [
  ['家居物業', '<i class="fa-solid fa-house fa-xl"></i>'],
  ['交通出行', '<i class="fa-solid fa-van-shuttle fa-xl"></i>'],
  ['休閒娛樂', '<i class="fa-solid fa-face-grin-beam fa-xl"></i>'],
  ['餐飲食品', '<i class="fa-solid fa-utensils fa-xl"></i>'],
  ['其他', '<i class="fa-solid fa-pen fa-xl"></i>']
]
db.once('open', () => {
  //建立category資料Ｆ
  Promise.all(Array.from(categoryList, data => {
    return Category.create({
      name: data[0],
      categoryIcon: data[1]
    })
  })).then(()=>{
    console.log('done')
    process.exit()
  })
})
