let fft;
let audioContext;
const audioElement = document.querySelector('audio');
let track;
let analyser;
let dataArray;
let selected = 'circle';
let theme = [130, 22, 192];
let itCount = 1;
let currAmp = 40;

document.getElementById('circle').addEventListener('click', () => {
  selected = 'circle';
});

document.getElementById('wave').addEventListener('click', () => {
  selected = 'wave';
});

document.getElementById('graph').addEventListener('click', () => {
  selected = 'graph';
});

document.getElementById('greenTheme').addEventListener('click', () => {
  theme = [26, 151, 30];
})

document.getElementById('purpleTheme').addEventListener('click', () => {
  theme = [130, 22, 192];
})

document.getElementById('orangeTheme').addEventListener('click', () => {
  theme = [228, 63, 4]
})

document.getElementById('blueTheme').addEventListener('click', () => {
  theme = [4, 228, 228]
})

function setup() {
  createCanvas(1900, 550);
  angleMode(DEGREES);
}

function draw() {
  background(50);
  beginShape();
  if (analyser){
    if (selected === 'circle') {
      stroke(...theme);
      strokeWeight(8);
      translate(width / 2, height / 2);
      analyser.getByteFrequencyData(dataArray);
      let timeArr = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(timeArr)
      for (let i = 0; i < fft; i++) {
        var angle = map(i, 0, fft, 0, 360);
        let freq = dataArray[i];
        let amp = timeArr[i];
        if (i === 0) {
          if (itCount < 3) {
            itCount += 1
          } else {
            itCount = 1;
          }
          if (itCount === 1) {
            currAmp = 40 + (amp / 30)
            console.log(currAmp)
          }
        }
        let r = map(freq, 1, 250, 5, 250);
        let y1 =  currAmp * sin(angle);
        let x1 =  currAmp * cos(angle);
        let y2 = r * sin(angle);
        let x2 = r * cos(angle);
        line(x1, y1, x2, y2);
      }
    } else if (selected === 'wave') {
      stroke(...theme);
      strokeWeight(4);
      analyser.getByteTimeDomainData(dataArray);
      for (let i = 0; i < 1900; i++) {
        let idx = Math.floor((i / 1900) * 1024);
        let freq = dataArray[idx];
        let y = map(freq, 10, 100, 150, 250);
        vertex(i, y);
      }
    } else if (selected === 'graph') {
      analyser.getByteFrequencyData(dataArray);
      stroke(...theme);
      strokeWeight(4);
      for (let i = 0; i < fft; i++) {
        let freq = dataArray[i];
        let x = map(freq, 0, 500, height, 0);
        let y = width / 64;
        rect(i * y, x, y, height - x);
      }
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
    fft = 64;
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