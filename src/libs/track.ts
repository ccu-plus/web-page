import axios from '@/libs/axios';
import canTrack from '@/libs/can-track';
import storage from 'store';

const tracker = storage.get('tracker');

export default function(path: string, data: object) {
  if (!canTrack) {
    return;
  }

  axios.post('/push', {
    agent: window.navigator.userAgent,
    uid: tracker,
    url: location.origin + path,
    ...data,
  }).catch(() => {
    //
  });
}
