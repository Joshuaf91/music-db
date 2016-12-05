const router = require("express").Router();
const Artist = require("../../models/artist-model");

const getAllA_Z = (req, res) => {
	//user order keywork and ASC will ensure that its starts with A then works its way to Z
    Artist.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        .then((data) => {
            res.send(data)
        })
}

const makeNewArtist = (req, res) => {
	// Artist.
}

const getById = (req, res) => {
	Artist.findById(req.params.id)
		.then(data => {
			res.send(data);
		})
}

router.route("/")
    .get(getAllA_Z)
    .post(makeNewArtist);

router.route("/:id")
	.get(getById);

router.route

module.exports = router;
