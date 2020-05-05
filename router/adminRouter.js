const express = require('express')
const { adminController } = require('../controller')

const router = express.Router()

router.get('/testDB', adminController.tesDB)

module.exports = router