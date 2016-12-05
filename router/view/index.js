const path = require('path');
const router = require("express").Router();


router.route('')
	.get((req, res) => {
  		res.sendFile(path.join(__dirname, '../../front/index.html'));
	});

module.exports = router;