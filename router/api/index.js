const router = require("express").Router();

router.use("/playlists", require("./playlists"))
router.use("/genres", require("./genres"))
router.use("/artists", require("./artists"));

module.exports = router
