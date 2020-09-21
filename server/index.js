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

app.listen(port, () => {console.log(`listening on port ${port}`)});