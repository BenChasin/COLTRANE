let fft;
let audioContext;
const audioElement = document.querySelector('audio');
let track;
let analyser;
let dataArray;

function setup() {
  createCanvas(550, 550);
  angleMode(DEGREES);
}

function draw() {
  background(50);
  stroke(130, 22, 192);
  strokeWeight(8);
  translate(width / 2, height / 2);
  beginShape();
  if (analyser){
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < fft; i++) {
      var angle = map(i, 0, fft, 0, 360);
      let amp = dataArray[i];
      let r = map(amp, 1, 256, 10, 250);
      let y1 =  50 * sin(angle);
      let x1 =  50 * cos(angle);
      let y = r * sin(angle);
      let x = r * cos(angle);
      line(x1, y1, x, y);
    }
  }
  noFill();
  endShape();
}

const playButton = document.getElementById('toggle');

playButton.addEventListener('click', function() {

  if (!audioContext) {
    audioContext = new AudioContext();
    track = audioContext.createMediaElementSource(audioElement);
    track.connect(audioContext.destination);
    analyser = audioContext.createAnalyser();
    track.connect(analyser);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.fftSize = 1024;
    fft = 64
    analyser.getByteFrequencyData(dataArray);
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  if (this.dataset.playing === 'false') {
    audioElement.play();
    this.dataset.playing = 'true';
  } else if (this.dataset.playing === 'true') {
    audioElement.pause();
    this.dataset.playing = 'false';
  }
}, false);