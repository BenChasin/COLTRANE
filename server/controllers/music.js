const Music = require('../database/model.js');

const getMusic = (request, response) => {
  console.log('working')
  Music.find({}, (err, res) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.json(res);
    }
  })
};

const makeMusic = (request, response) => {
  let m = new Music({
    url: `./storage/${request.body.url}`,
    title: request.body.title
  });
  m.save((err, res) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.sendStatus(201);
    }
  })
}

module.exports = {
  getMusic,
  makeMusic
}