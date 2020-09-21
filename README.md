# COTRANE

## Description
This is a customizable music dashboard made in a 24 hour code sprint. Sample mp3s are provided, and additional mp3s can be added in public/storage. If an mp3 is added, make sure to send a post request with the relevant info to the server.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).
- Node 6.13.0
- MongoDB 

## Development

### Installing Dependencies

From within the root directory:
```sh
npm install -g webpack
npm install
```
### Scripts
Start the server
```
npm start
```
### API
GET music info
```
/api/music
```
POST new music
```
/api/music
```
Sample input
```
{
  url: name without path.mp3,
  title: title of the song
}
```
