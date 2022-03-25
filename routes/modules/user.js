const express = require('express')
const User = require('../../models/user')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    return console.log('密碼長度不一致')
  }
  User.findOne({ name })
    .then(user => {
      if (user) {
        console.log('此用戶已經有人使用')
        res.render('register', { name, password, confirmPassword })
      } else {
        return User.create({
          name,
          password
        })
          .then(() => res.redirect('/users/login'))
      }

    })

})


module.exports = router