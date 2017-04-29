importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyAcnxGrGpf2HjlyzVBSNonznbuWR6cZ_B4",
  authDomain: "kancioapp.firebaseapp.com",
  databaseURL: "https://kancioapp.firebaseio.com",
  projectId: "kancioapp",
  storageBucket: "kancioapp.appspot.com",
  messagingSenderId: "376337810996"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload){
  const title = 'Hello'
  const options = {
    body: payload.data.status
  };
  return self.registration.showNotification(title, options);
});
