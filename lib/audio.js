function rowNonZero(arr) {
  let m = 0;
  arr.map(a => {
    if(a !== 0) m++;
  })
  return m;
}

function max(arr) {
  let m = 0;
  arr.map(a => {
    if(a > m) m = a
  })
  return m;
}

class Sound {
  constructor(url) {
    this.url = url;
    this._analyser = Pizzicato.context.createAnalyser();
    this._bufferLength = this._analyser.frequencyBinCount;
    this._frequencyDataArray = new Uint8Array(this._bufferLength);
    this._timeDomainDataArray = new Uint8Array(this._bufferLength);
  }

  load() {
    return new Promise((resolve, reject) => {
      this.sound = new Pz.Sound(this.url, () => {
        this.sound.loop = true;
        this.sound.connect(this._analyser);
        resolve();
      })
    });        
  }

  play() {
    this.sound.play()
  }

  getByteFrequencyData() {
    this._analyser.getByteFrequencyData(this._frequencyDataArray);
    return this._frequencyDataArray;
  }

  getByteTimeDomainData() {
    this._analyser.getByteTimeDomainData(this._timeDomainDataArray);
    return this._timeDomainDataArray;
  }

  addEffect(filter) {
    this.sound.addEffect(filter);
  }
}
