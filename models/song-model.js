const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Genre = require('./genre-model')
const Artist = require('./artist-model')

//////////
// YOUR CODE HERE:
//////////
const Song = sequelizeConnection.define('song', {
  title: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 250]
    }
  },
  youtube_url: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 50],
      isUrl: true
    }
  }
})

Song.belongsTo(Artist);
Song.belongsToMany(Genre, {through: 'song_genre'});
Genre.belongsToMany(Song, {through: 'song_genre'});

module.exports = Song;
