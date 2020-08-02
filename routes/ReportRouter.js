const express = require('express')
const { ReportController } = require('../controllers')
const router = express.Router()

router.get('/demographic/gender', ReportController.findGenderDemographic)
router.get('/demographic/postcode', ReportController.findPostcodeDemographic)
router.get('/demographic/age', ReportController.findAgeRangeDemographic)
router.get('/statistic/avg-weekly-responses', ReportController.findAvgWeeklyResponses)

module.exports = router