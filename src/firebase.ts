import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { getInstallations, getId } from '@firebase/installations';

const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);
const installations = getInstallations(firebase);

export { firebase, messaging };

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_CLOUD_MESSAGING_VAPID })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          return
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .then(() => {
        return getId(installations)
      })
      .then(id => {
        if (id) {
          console.log('current installation id: ', id);
        return id
        } else {
          console.log('No installation id.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });