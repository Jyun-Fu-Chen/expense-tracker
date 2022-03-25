const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This user is not registered!' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'User or Password incorrect' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}