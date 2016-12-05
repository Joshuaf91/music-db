const router = require("express").Router();

router.use("/genres", require("./genres.js"))
router.use("/artists", require("./artists"));

module.exports = router
