const express = require('express')
const router  = express.Router()
router.get('/', (req, res) => {
	res,send({
		code: 200,
		message: "Api Is WORKING"
	});
})

module.exports = router
