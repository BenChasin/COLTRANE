const express = require('express');
const app = express();
const port = 1955;
const path = require('path');
const database = require('./database');
const c = require('./controllers/music.js');

app.use(express.json());
app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, '../public')));


app.get('/api/music', c.getMusic);
app.post('/api/music', c.makeMusic);

// app.post('/uploadMp3', multer.single('file'), (req, res) => {
//   let name = __dirname + '/songs/' + req.file;
//   let fileWriteStream = fs.createWriteStream(name);
//   fileWriteStream.on('finish', () => {
//       console.log('file saved successfully');
//       res.send({ message: 'file saved successfully' })
//   })
//   fileWriteStream.end(req.file.buffer)
// })

app.listen(port, () => {console.log(`listening on port ${port}`)});