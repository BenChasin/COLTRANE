const Music = require('../database/model.js');

const getMusic = (request, response) => {
  console.log('working')
  Music.find({}, (err, res) => {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    } else {
      response.json(res);
    }
  })
};

const makeMusic = (request, response) => {
  console.log('working')
  console.log(request.body)
  let m = new Music({
    url: `./storage/${request.body.url}`,
    title: request.body.title,
    genre: request.body.genre
  });
  m.save((err, res) => {
    if (err) {
      console.log('ssdsa')
      response.sendStatus(500);
    } else {
      console.log('jndsac')
      response.sendStatus(201);
    }
  })
}

module.exports = {
  getMusic,
  makeMusic
}