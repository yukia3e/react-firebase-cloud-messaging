import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);

export { firebase, messaging };

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_CLOUD_MESSAGING_VAPID })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          return currentToken
        } else {
          console.log('No registration token available. Request permission to generate one.');
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