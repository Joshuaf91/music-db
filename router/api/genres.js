const router = require('express').Router();
const path = require('path');
const Genre = require(path.join(__dirname, '../../models/genre-model'));

const updateGenreById = (req, res) => {
  Genre.update()
}

const createPost = (req, res) => {
  Genre.findOrCreate({where: {title: req.body.title}})
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    res.status(500)
  })
}

const getGenreById = (req, res) => {
  Genre.findById(req.params.id)
  .then((data) => {
    res.send(data)
  })
}

const getAllGenres_AZ = (req, res) => {
  Genre.findAll({
    order: [
      ['title', 'ASC']
    ]
  }).then((data) => {
    res.send(data)
  })
}

router.route('/:id/:newGenre')
.post(updateGenreById)

router.route('/:id')
.get(getGenreById)

router.route('/')
.get(getAllGenres_AZ)
.post(createPost)

module.exports = router
