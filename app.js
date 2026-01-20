// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add new message
document.getElementById('guestForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    db.collection("messages").add({
        name: name,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById('guestForm').reset();
});

// Display messages
db.collection("messages").orderBy("timestamp").onSnapshot((snapshot) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    snapshot.forEach((doc) => {
        const msg = doc.data();
        messagesDiv.innerHTML += `<p><strong>${msg.name}</strong>: ${msg.message}</p>`;
    });
});
