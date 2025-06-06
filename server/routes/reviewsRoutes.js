const express =require('express')
const {getAllReviews, createReview} = require('../controllers/reviewController')
const authenticate = require('../auth/verifyToken')

const router = express.Router({mergeParams:true}); //id will be accessible for nested routing

router.route('/').get(getAllReviews).post(authenticate,createReview)

module.exports = router