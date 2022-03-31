const express = require('express')
const passport = require('passport')
const User = require('../../models/user')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.post('/register', (req, res) => {
  const { username, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    req.flash('warning_msg', '確認密碼與密碼不一致')
    return res.render('register', { username, password })
  }
  User.findOne({ username })
    .then(user => {
      if (user) {
        console.log('此用戶已經有人使用')
        res.render('register', { username, password, confirmPassword })
      } else {
        return User.create({
          username,
          password
        })
          .then(() => res.redirect('/users/login'))
      }
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router