const router = require("express").Router();
const Artist = require("../../models/artist-model");

const getAllA_Z = (req, res) => {
    //user order keywork and ASC will ensure that its starts with A then works its way to Z
    Artist.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => { 
            res.sendStatus(500) 
        })
}

const makeNewArtist = (req, res) => {
    //searches if it exsist if it doesnt it will create it.
    Artist.findOrCreate({
            where: {
                name: req.body.name,
            }
        })
        .then(artist => {
            res.send(artist);
        })
        .catch(err => {
            res.sendStatus(500);
        })
}

const getById = (req, res) => {
    Artist.findById(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => { 
            res.sendStatus(500);
        })
}

const deleteById = (req, res) => {
    Artist.destroy({
            where: {id: req.params.id}
        })
        .then(data => {
            res.sendStatus(200);
        })
        .catch(err => { 
            res.sendStatus(500);
        })
}

const updateById = (req, res) => {
    Artist.findById(req.params.id)
        .then(data=>{
            return data.update({
                name: req.params.name
            })
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => { 
            res.sendStatus(500);
        });
}

router.route("/")
    .get(getAllA_Z)
    .post(makeNewArtist);

router.route("/:id")
    .get(getById)
    .delete(deleteById);

router.route("/:id/:name")
    .put(updateById)

module.exports = router;
