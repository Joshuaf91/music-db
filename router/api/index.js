const router = require("express").Router();

router.use("/artists", require("./artists"));

module.exports = router