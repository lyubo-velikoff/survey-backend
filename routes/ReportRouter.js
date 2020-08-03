const express = require('express')
const { ReportController } = require('../controllers')
const router = express.Router()

/**
 * Get a demographic for total response for answer type 0, 1, 2, 3 by gender
 * @route GET /reports/demographic/gender
 * @group Reports - Operations about reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/demographic/gender', ReportController.findGenderDemographic)

/**
 * Get a demographic for total response for answer type 0, 1, 2, 3 by postcode
 * @route GET /reports/demographic/postcode
 * @group Reports - Operations about reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/demographic/postcode', ReportController.findPostcodeDemographic)

/**
 * Get a demographic for total response for answer type 0, 1, 2, 3 by age range
 * @route GET /reports/demographic/age
 * @group Reports - Operations about reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/demographic/age', ReportController.findAgeRangeDemographic)

/**
 * Get a statistic for number of people responding with answer type 0, 1, 2, 3 for each week
 * @route GET /reports/statistic/avg-weekly-responses
 * @group Reports - Operations about reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/statistic/avg-weekly-responses', ReportController.findAvgWeeklyResponses)

/**
 * Get a list of users whose average number of answers with type 0 is bellow 1 standard deviation from the population average
 * @route GET /reports/statistic/avg-weekly-responses
 * @group Reports - Operations about reports
 * @returns {Error}  default - Unexpected error
 */
router.get('/statistic/list-users-bellow-sdva', ReportController.findUserListBellowSdva)

module.exports = router