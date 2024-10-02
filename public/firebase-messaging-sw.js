importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);


const firebaseConfig = {
    apiKey: "AIzaSyDRNcC4TbnKTP3iUVnoVjhJ_QMrK0CeW2M",
    authDomain: "rgjobs-88be3.firebaseapp.com",
    projectId: "rgjobs-88be3",
    storageBucket: "rgjobs-88be3.appspot.com",
    messagingSenderId: "985472583440",
    appId: "1:985472583440:web:cac3ba0f7c77a2ed504795",
    measurementId: "G-4XG1HR2ZPE"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});