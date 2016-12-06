const router = require("express").Router();

router.use("/artists", require("./artists"));
router.use("/songs", require("./songs"));

module.exports = router