
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
//import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  collectionGroup,
  query,
  where,
  getDocs,
  onSnapshot,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {
  // Put you credentials here
  apiKey: "AIzaSyAzw_RSeXCOtQ0GQoeBrqmBhVsBeoD-7Yc",
  authDomain: "bcuicuilco-59152.firebaseapp.com",
  projectId: "bcuicuilco-59152",
  storageBucket: "bcuicuilco-59152.appspot.com",
  messagingSenderId: "980933843566",
  appId: "1:980933843566:web:6763cc56e4653611ab647f"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();




var destination = localStorage.getItem("destino");

export const cerrarSesion = () =>
  signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem('UserID');
    localStorage.removeItem('IDname');
    window.location.href = 'index.html';
  }).catch((error) => {
    // An error happened.
  });


export const cerrarSesion2 = () =>
  signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem('UserID');
    localStorage.removeItem('IDname');
    window.location.href = 'registro.html';
  }).catch((error) => {
    // An error happened.
  });




/**
   *@param {string} email the description of the Task
   *@param {string} password the description of the Task
*/

export const crearCuenta = (auth, email, password, nombre) =>
  createUserWithEmailAndPassword(auth, email, password, nombre)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      console.log(nombre);
      console.log(userCredential.user.uid);
      localStorage.setItem("UserID", userCredential.user.uid);
      localStorage.setItem("IDname", nombre);
      window.location.href = 'home.html';
      // console.log(IDname);


      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage)
      // ..
    });


export const iniciarSesion = (auth, email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem("UserID", userCredential.user.uid);
      localStorage.removeItem('IDname');
      window.location.href = 'home.html';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

var userID = localStorage.getItem("UserID");




//var destination = localStorage.getItem("destino");

//console.log("users/"+userID)

//var holaperfil = "/users/"+userID+"negocio";


onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    var nombreID = localStorage.getItem("IDname");

    const contenedorQR = document.getElementById('contenedorQR');
    const formulario = document.getElementById('formulario');
    const QR = new QRCode(contenedorQR);
    QR.makeCode(uid);


    var x = document.getElementById("escaner");
    console.log("hey " + uid)



    if (nombreID == null) {
      //console.log("a")
    } else {
      setDoc(doc(db, "users", uid), {
        name: nombreID,

      });
    }

    // window.location.href = 'home.html'
    // ...
  } else {
    // User is signed out
    console.log("usuario NO logueado");

    // ...
  }
  //window.location.href = 'home.html';
});


var pruebas = "/users/nOQszCqK8vUqRZ08RkheqwDibgy2/tareas"

//console.log(holaperfil)


var holas = userID;
//console.log(holaperfil)
var usuarioRaiz = "users/" + userID + "/tareas";
var miUusarioo = "users/" + userID;

// Initialize Firebase






//esto va a funcionar para obtener todos los usuarios
//const querySnapshot = await getDocs(collection(db, "users"));
//querySnapshot.forEach((collection) => {
// doc.data() is never undefined for query doc snapshots
//console.log(collection.id, " => ", collection.data());
//query(collectionGroup(db, "tareas"), where("uid", "==", collection.id)); 
//console.log(query);

//console.log(collection.data().count);


//});


//const holas = "/users/"+userID+"/"+destination;
console.log(usuarioRaiz)

/**
 * Save a New Task in Firestore
 * @param {string} date the title of the Task
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 * @param {string} category the description of the Task
 * @param {string} cantidad the description of the Task
 * @param {string} uid the description of the Task
 * 
 * @param {string} content the title of the Task
 * 
 * 
 * @param {string} nombre the description of the Task
 
 */
//export const saveTask = (title, description) =>
//addDoc(collection(db,  'users'), { title, description });



export const saveTask = (date, title, category, description, cantidad, uid) =>
  addDoc(collection(db, usuarioRaiz), { date, title, category, description, cantidad, uid });


export const saveDate = (date, hour, nombre, content) =>
  setDoc(doc(db, "users/" + content + "/acceso/" + date), { date, hour, nombre, content });



export const onGetTasks = (callback) =>
  onSnapshot(collection(db, usuarioRaiz), callback);

export const onGetEvents = (callback) =>
  onSnapshot(collection(db, "users"), callback);



export const onGetTasks21 = (callback) =>
  onSnapshot(collectionGroup(db, "tareas"), callback);

// query(collectionGroup(db, "tareas"), where("uid", "==", collection.id)); 

export const onGetTareas = (callback) =>
  onSnapshot(collection(db, "users"), callback);


const date = new Date();
const currentMonth = date.getMonth() + 1;

export const onGetTareas2 = (callback) =>
  onSnapshot(collectionGroup(db, "" + currentMonth + ""), callback);



/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, usuarioRaiz, id));

export const getTask = (id) => getDoc(doc(db, usuarioRaiz, id));

export const getTasking = () => getDoc(doc(db, "users", userID));




export const getTaskingName = (id) => getDoc(doc(db, "users", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, usuarioRaiz, id), newFields);

export const getTasks = () => getDocs(collection(db, userID));







