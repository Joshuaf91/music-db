const router = require('express').Router();
const path = require('path');
const Playlist = require(path.join(__dirname, '../../models/playlist-model'))

const getAllPlaylists = (req, res) => {
  Playlist.findAll()
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    res.sendStatus(500)
  })
}

router.route('/')
.get(getAllPlaylists)

module.exports = router
