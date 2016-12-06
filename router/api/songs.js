const router = require('express').Router();
const Song = require('../../models/song-model');
const Artist = require('../../models/artist-model');
const Genre = require('../../models/genre-model');

const getAllSongs = (req,res)=>{
	Song.findAll({include: [Artist, Genre]})
		.then(data => {
			res.send(data);
		})
		.catch(err => { 
			res.sendStatus(500) 
		})
}
// /api/songs GET all songs with genre and artist information fully populated (in other words, should say full artist name and genre names, instead of only having the ids)


const getSongById = (req,res)=>{
	Song.findById(req.params.id, {include: [Artist, Genre]})
		.then(data => {
			res.send(data);
		})
		.catch(err => { 
			res.sendStatus(500) 
		})
}
// /api/songs/:id GET specific song by id


const makeNewSong = (req, res) => {
	// must send bellow obj
	// {
	// title: 'Swim Good',
	// youtube_url: 'https://www.youtube.com/watch?v=PmN9rZW0HGo', 
	// artist: 'Frank Ocean',
	// genres:['electronic','hip hop']
	// }
  Artist.findOrCreate({where: {name: req.body.artist}})
    .then((artist) => {
      return Song.findOrCreate({
			where: {
				title: req.body.title,
				youtube_url: req.body.youtube_url,
				artistId: artist[0].id
			}
		});
	})
    .then(song => {
    	console.log("this is the song on line 45", song);
    	let genres = JSON.parse(req.body.genres);
    	console.log(JSON.parse(req.body.genres));
    	let genres = req.body.genres.map(element => {
	    	return Genre.findOrCreate({
	    		where: {
	    			title: element
	    		}
	    	})
	    	console.log(element);
	    })
	    console.log("asdfasdfasdfasdfasdfas", genres);
		song.addGenres([...genres]);
		console.log(song);
		return song;
    })
    .then(song => {
    	console.log("im on line 59 WOOT");
    	return Song.findById(song.id, 
    			{include: [Artist, Genre]}
    		);
    })
    .then(song => {
    	res.send(song);
    })
    .catch((err) => {
		res.status(500)
    })

}
// /api/songs POST (create) a new song
// To add in the genres you will need to use a special 'accessor' method. That Sequelize automatically creates. Checkout the following Sequelize docs and look at the 'getUsers', 'setUsers', 'addUser', 'addProject', 'setProject', 'getProject', etc. examples. These methods are all automatically created and will be named according to the name of your models. You can also see the song-seed.js file for a code example of one of these methods in use. Note that when you call the methods you have to use them on the individual songs (aka instances) and not on the model itsel.

const updateSongById = (req,res)=>{
	Song.findById(req.params.id)
		.then(data => { 
			return data.update({
				title: req.params.newTitle
			})
		})
		.then(data => {
			res.send(data);
		})
		.catch((err) => {
    		res.status(500)
    })
}
// /api/songs/:id/:newTitle PUT (update) a specific song's title

const deleteSongById = (req,res)=>{
	Song.destroy({
            where: {id: req.params.id}
        })
		.then(data => {
			console.log(data);
			res.sendStatus(200);
		})
		.catch(err => {
			res.sendStatus(500);
		});
}
// /api/songs/:id DELETE a specific song by id

router.route("/")
	.get(getAllSongs)
	.post(makeNewSong);

router.route("/:id")
	.get(getSongById)
	.delete(deleteSongById);

router.route("/:id/:newTitle")
	.get(updateSongById);

module.exports = router;