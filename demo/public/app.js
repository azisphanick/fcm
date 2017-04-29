// Initialize Firebase
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
messaging.requestPermission()
.then(function(){
  console.log('Memiliki izin');
  return messaging.getToken();
})
.then(function(token){
  console.log(token);
})
.catch(function(err){
  console.log('Terjadi kesalahan', err);
})

messaging.onMessage(function(payload){
  console.log('onMessage.', payload);
});
