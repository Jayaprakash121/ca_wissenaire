const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,

  query,

  orderBy,
} = require("firebase/firestore");
const { getUserData, extractAccessTokenFromURL } = require("./sandbox");
const main = document.getElementById("main");
const loader = document.getElementById("not-main");
const loaderh1 = document.getElementById("notmain-h1");
const firebaseConfig = {
  apiKey: "AIzaSyAPTJNlY-hCX0uGfUZzAXfn4m05DOGOm1w",
  authDomain: "wissenaire-401008.firebaseapp.com",
  projectId: "wissenaire-401008",
  storageBucket: "wissenaire-401008.appspot.com",
  messagingSenderId: "160027367801",
  appId: "1:160027367801:web:77635d4f23adcb091937a8",
  measurementId: "G-TEB52183BC",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colref = collection(db, "ca");

const userPosition = document.getElementById("position");
const currentName = document.getElementById("currentName");
const currentScore = document.getElementById("currentScore");

const firstName = document.getElementById("firstName");
const firstScore = document.getElementById("firstScore");

const secondName = document.getElementById("secondName");
const secondScore = document.getElementById("secondScore");

const thirdName = document.getElementById("thirdName");
const thirdScore = document.getElementById("thirdScore");

const fourthName = document.getElementById("fourthName");
const fourthScore = document.getElementById("fourthScore");

const fifthName = document.getElementById("fifthName");
const fifthScore = document.getElementById("fifthScore");

const userElement = document.getElementById("userDetails");
const lead = (postion, top) => {
  firstName.textContent = top[0].name;
  firstScore.textContent = top[0].score;

  secondName.textContent = top[1].name;
  secondScore.textContent = top[1].score;

  thirdName.textContent = top[2].name;
  thirdScore.textContent = top[2].score;

  fourthName.textContent = top[3].name;
  fourthScore.textContent = top[3].score;

  fifthName.textContent = top[4].name;
  fifthScore.textContent = top[4].score;

  if (postion <= 5) {
    userElement.remove();
  }
};

const getPosition = async (email) => {
  const q = query(colref, orderBy("score", "desc"));
  const data = [];
  try {
    const snap = await getDocs(q);
    snap.forEach((each) => {
      data.push({ ...each.data() });
    });
  } catch (e) {
    alert("Something Went wrong");
    console.log(e);
  }

  const position = data.findIndex((each) => each.email === email);
  const person = data.filter((each) => each.email === email)[0];

  userPosition.textContent = position;
  if (person === undefined) {
    loaderh1.textContent = "Unauthorized";
    alert("UNAUTHORIZED");

    return;
  }
  currentName.innerHTML = person.name;

  currentScore.textContent = person.score;
  console.log(position, data.slice(0, 5));
  lead(position, data.slice(0, 5));
  main.style.display = "block";
  loader.style.display = "none";
};
const displayData = async () => {
  const email = await getUserData(extractAccessTokenFromURL());
  getPosition(email);
};

displayData();
