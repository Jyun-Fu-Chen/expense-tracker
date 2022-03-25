const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

module.exports = router