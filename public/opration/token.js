var firebaseConfig = {
    apiKey: "AIzaSyBtSa_HJ_ASnGhGMhrpLvWdzZ21aACIUyc",
    authDomain: "gimbal-cc41f.firebaseapp.com",
    projectId: "gimbal-cc41f",
    storageBucket: "gimbal-cc41f.appspot.com",
    messagingSenderId: "705297271722",
    appId: "1:705297271722:web:51aced8700f3e77b6939d3",
    measurementId: "G-933HKS071P"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

$(document).ready(function() {
    initFirebaseMessagingRegistration();
})
function initFirebaseMessagingRegistration() {
        messaging
        .requestPermission()
        .then(function () {
            return messaging.getToken()
        })
        .then(function(token) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: '{{ route("save-token") }}',
                type: 'POST',
                data: {
                    token: token
                },
                dataType: 'JSON',
                success: function (response) {
                    console.log('Token saved successfully.');
                },
                error: function (err) {
                    console.log('User Chat Token Error'+ err);
                },
            });

        }).catch(function (err) {
            console.log('User Chat Token Error'+ err);
        });
 }

messaging.onMessage(function(payload) {
    const noteTitle = payload.notification.title;
    const noteOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };
    new Notification(noteTitle, noteOptions);
});