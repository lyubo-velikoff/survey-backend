const express = require('express')
const { ReportController } = require('../controllers')
const router = express.Router()

router.get('/demographic/gender', ReportController.findGenderDemographic)
router.get('/demographic/postcode', ReportController.findPostcodeDemographic)

module.exports = router