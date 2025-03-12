// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPhBgWiJU2dzxjxtcoZyPLY2aTX63Hugg",
    authDomain: "role-base-login-ea878.firebaseapp.com",
    projectId: "role-base-login-ea878",
    storageBucket: "role-base-login-ea878.firebasestorage.app",
    messagingSenderId: "712806771118",
    appId: "1:712806771118:web:d120b96440c10044e8403f",
    measurementId: "G-80PR1E2923"
  };


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// User Registration
function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const role = document.getElementById("role").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection("users").doc(user.uid).set({
                name: name,
                email: email,
                role: role
            });
        })
        .then(() => {
            alert("User Registered!");
            window.location.href = "loginpage.html";
        })
        .catch(error => alert(error.message));
}

// User Login
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection("users").doc(user.uid).get();
        })
        .then(doc => {
            if (doc.exists) {
                const role = doc.data().role;
                if (role === "admin") window.location.href = "admin_dashboard.html";
                else if (role === "finance_manager") window.location.href = "finance.html";
                else window.location.href = "user_dashboard.html";
            }
        })
        .catch(error => alert(error.message));
}

// Logout
function logout() {
    auth.signOut().then(() => {
        window.location.href = "loginpage.html";
    });
}
