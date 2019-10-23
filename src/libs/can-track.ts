import storage from 'store';

let canTrack = true;

if (window.navigator && (window.navigator.doNotTrack === '1' || window.navigator.doNotTrack === 'yes')) {
  canTrack = false;
} else {
  // @ts-ignore
  if (window.navigator && window.navigator.msDoNotTrack === '1') {
    canTrack = false;
  } else if (window.doNotTrack === '1') {
    canTrack = false;
  }
}

if (canTrack) {
  if (!storage.get('tracker')) {
    let uid = Date.now().toString(16);

    while (uid.length < 16) {
      // @ts-ignore
      uid += (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(1))[0].toString(16);
    }

    storage.set('tracker', uid.substr(0, 16));
  }
}

export default canTrack;
