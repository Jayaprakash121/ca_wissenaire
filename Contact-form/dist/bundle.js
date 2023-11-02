/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./functions.js":
/*!**********************!*\
  !*** ./functions.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { initializeApp } = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/index.cjs.js\");\nconst {\n  getFirestore,\n  collection,\n  getDocs,\n\n  query,\n\n  orderBy,\n} = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/index.cjs.js\");\nconst { getUserData, extractAccessTokenFromURL } = __webpack_require__(/*! ./sandbox */ \"./sandbox.js\");\nconst main = document.getElementById(\"main\");\nconst loader = document.getElementById(\"not-main\");\nconst loaderh1 = document.getElementById(\"notmain-h1\");\nconst firebaseConfig = {\n  apiKey: \"AIzaSyAPTJNlY-hCX0uGfUZzAXfn4m05DOGOm1w\",\n  authDomain: \"wissenaire-401008.firebaseapp.com\",\n  projectId: \"wissenaire-401008\",\n  storageBucket: \"wissenaire-401008.appspot.com\",\n  messagingSenderId: \"160027367801\",\n  appId: \"1:160027367801:web:77635d4f23adcb091937a8\",\n  measurementId: \"G-TEB52183BC\",\n};\nconst app = initializeApp(firebaseConfig);\nconst db = getFirestore(app);\nconst colref = collection(db, \"ca\");\n\nconst userPosition = document.getElementById(\"position\");\nconst currentName = document.getElementById(\"currentName\");\nconst currentScore = document.getElementById(\"currentScore\");\n\nconst firstName = document.getElementById(\"firstName\");\nconst firstScore = document.getElementById(\"firstScore\");\n\nconst secondName = document.getElementById(\"secondName\");\nconst secondScore = document.getElementById(\"secondScore\");\n\nconst thirdName = document.getElementById(\"thirdName\");\nconst thirdScore = document.getElementById(\"thirdScore\");\n\nconst fourthName = document.getElementById(\"fourthName\");\nconst fourthScore = document.getElementById(\"fourthScore\");\n\nconst fifthName = document.getElementById(\"fifthName\");\nconst fifthScore = document.getElementById(\"fifthScore\");\n\nconst userElement = document.getElementById(\"userDetails\");\nconst lead = (postion, top) => {\n  firstName.textContent = top[0].name;\n  firstScore.textContent = top[0].score;\n\n  secondName.textContent = top[1].name;\n  secondScore.textContent = top[1].score;\n\n  thirdName.textContent = top[2].name;\n  thirdScore.textContent = top[2].score;\n\n  fourthName.textContent = top[3].name;\n  fourthScore.textContent = top[3].score;\n\n  fifthName.textContent = top[4].name;\n  fifthScore.textContent = top[4].score;\n\n  if (postion <= 5) {\n    userElement.remove();\n  }\n};\n\nconst getPosition = async (email) => {\n  const q = query(colref, orderBy(\"score\", \"desc\"));\n  const data = [];\n  try {\n    const snap = await getDocs(q);\n    snap.forEach((each) => {\n      data.push({ ...each.data() });\n    });\n  } catch (e) {\n    alert(\"Something Went wrong\");\n    console.log(e);\n  }\n\n  const position = data.findIndex((each) => each.email === email);\n  const person = data.filter((each) => each.email === email)[0];\n\n  userPosition.textContent = position;\n  if (person === undefined) {\n    loaderh1.textContent = \"Unauthorized\";\n    alert(\"UNAUTHORIZED\");\n\n    return;\n  }\n  currentName.innerHTML = person.name;\n\n  currentScore.textContent = person.score;\n  console.log(position, data.slice(0, 5));\n  lead(position, data.slice(0, 5));\n  main.style.display = \"block\";\n  loader.style.display = \"none\";\n};\nconst displayData = async () => {\n  const email = await getUserData(extractAccessTokenFromURL());\n  getPosition(email);\n};\n\ndisplayData();\n\n\n//# sourceURL=webpack://firebase/./functions.js?");

/***/ }),

/***/ "./node_modules/firebase/app/dist/index.cjs.js":
/*!*****************************************************!*\
  !*** ./node_modules/firebase/app/dist/index.cjs.js ***!
  \*****************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/karthickcherukuri/Downloads/ca_wissenaire-main 3/Contact-form/node_modules/firebase/app/dist/index.cjs.js'\");\n\n//# sourceURL=webpack://firebase/./node_modules/firebase/app/dist/index.cjs.js?");

/***/ }),

/***/ "./node_modules/firebase/firestore/dist/index.cjs.js":
/*!***********************************************************!*\
  !*** ./node_modules/firebase/firestore/dist/index.cjs.js ***!
  \***********************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/karthickcherukuri/Downloads/ca_wissenaire-main 3/Contact-form/node_modules/firebase/firestore/dist/index.cjs.js'\");\n\n//# sourceURL=webpack://firebase/./node_modules/firebase/firestore/dist/index.cjs.js?");

/***/ }),

/***/ "./sandbox.js":
/*!********************!*\
  !*** ./sandbox.js ***!
  \********************/
/***/ ((module) => {

eval("function extractAccessTokenFromURL() {\n  var hash = window.location.hash.substring(1);\n  var params = new URLSearchParams(hash);\n  return params.get(\"access_token\");\n}\n\nconst CookieManager = {\n  setCookie: function (name, value, days) {\n    let expires = \"\";\n    if (days) {\n      let date = new Date();\n      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);\n      expires = \"; expires=\" + date.toUTCString();\n    }\n    document.cookie = name + \"=\" + value + expires + \"; path=/\";\n  },\n\n  getCookie: function (name) {\n    let nameEQ = name + \"=\";\n    let ca = document.cookie.split(\";\");\n    for (let i = 0; i < ca.length; i++) {\n      let c = ca[i];\n      while (c.charAt(0) == \" \") c = c.substring(1, c.length);\n      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);\n    }\n    return null;\n  },\n\n  deleteCookie: function (name) {\n    document.cookie =\n      name + \"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;\";\n  },\n};\n\nasync function getUserData(accessToken) {\n  try {\n    const response = await fetch(\n      \"https://www.googleapis.com/oauth2/v1/userinfo\",\n      {\n        headers: {\n          Authorization: \"Bearer \" + accessToken,\n        },\n      }\n    );\n    const data = await response.json();\n    const { email } = data;\n    console.log(email);\n    return email;\n  } catch (e) {\n    console.log(e);\n  }\n}\n\ngetUserData(extractAccessTokenFromURL());\nmodule.exports = { getUserData, extractAccessTokenFromURL };\n\n\n//# sourceURL=webpack://firebase/./sandbox.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./functions.js");
/******/ 	
/******/ })()
;