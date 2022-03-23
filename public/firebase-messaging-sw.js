// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: `AIzaSyBSEddHkv7O8cGG4cguOyJS4V1O5MD7WLs`,
  authDomain: `be-abe-yuki.firebaseapp.com`,
  projectId: `be-abe-yuki`,
  storageBucket: `be-abe-yuki.appspot.com`,
  messagingSenderId: `795109204763`,
  appId: `1:795109204763:web:8c71750e5c851e953029be`,
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});