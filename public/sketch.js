let fft;
let audioContext;
let track;
let analyser;
let dataArray;
let selected = 'circle';
let theme = [130, 22, 192];
let itCount = 1;
let currAmp = 40;
let songs = {};
let currentSong;

const audioElement = document.querySelector('audio');

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
  theme = [2, 139, 2];
  changeTheme();
})

document.getElementById('purpleTheme').addEventListener('click', () => {
  theme = [130, 22, 192];
  changeTheme();
})

document.getElementById('orangeTheme').addEventListener('click', () => {
  theme = [228, 63, 4];
  changeTheme();
})

document.getElementById('blueTheme').addEventListener('click', () => {
  theme = [4, 228, 228];
  changeTheme();
});

const changeTheme = () => {
  let b = document.querySelectorAll('button');
  b.forEach((button) => {
    button.style.border = `2px solid rgb(${[...theme]})`;
    button.style.color = `rgb(${[...theme]})`;
  });
  let t = document.getElementsByClassName('txt');
  for (let text of t) {
    text.style.color = `rgb(${[...theme]})`;
  };
  let s = document.querySelectorAll('select');
  s.forEach((select) => {
    select.style.border = `2px solid rgb(${[...theme]})`;
    select.style.color = `rgb(${[...theme]})`;
  });
}

let s = document.getElementById('song')
s.addEventListener('change', () => {
  let selectedSong = s.options[s.selectedIndex].value;
  let newUrl = songs[selectedSong].url
  document.getElementById('audioPlaying').src = newUrl;
})

const requestSetup = () => {
  $.ajax({
    type: 'GET',
    url: '/api/music',
    contentType: 'application/json',
    success: (data) => {
      populateSelect(data);
    },
    error: (err) => {
      console.log('error in get', err);
    }
  })
};

requestSetup();
const populateSelect = (data) => {
  let select = document.getElementById("song");
  for (let obj of data) {
    songs[obj.title] = {
      url: obj.url,
      genre: obj.genre
    };
    select.options[select.options.length] = new Option(obj.title, obj.title);
  }

}

function setup() {
  createCanvas(1900, 450);
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