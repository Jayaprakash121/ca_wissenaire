let items = document.querySelectorAll(".slider .item");
let names = document.querySelectorAll(".slider .item .item-name");
let next = document.getElementById("next");
let prev = document.getElementById("prev");

const CookieManager = {
  setCookie: function (name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  },

  getCookie: function (name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  deleteCookie: function (name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
};

function extractAccessTokenFromURL() {
  var hash = window.location.hash.substring(1);
  var params = new URLSearchParams(hash);
  return params.get("access_token");
}

function getUserData(accessToken) {
  CookieManager.setCookie("usertoken", accessToken, 7);
}

// Entry point after redirect
function handleOAuthRedirect() {
  var accessToken = extractAccessTokenFromURL();
  if (accessToken || CookieManager.getCookie("usertoken")) {
    getUserData(accessToken);
  } else {
    window.location.pathname = "/login.html";
  }
}

// Call the function to handle the redirect
// handleOAuthRedirect();

let active = 3;
function loadShow() {
  let stt = 0;
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].style.filter = "none";
  items[active].style.opacity = 1;

  for (var i = 0; i < items.length; i++) {
    if (i == active) continue;
    stt = i - active;
    if (i > active) {
      items[i].style.transform = `translateX(${150 * stt}px) scale(${
        1 - 0.2 * stt
      }) perspective(16px) rotateY(-1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = `blur(5px)`;
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = stt > 0 ? stt : -stt;
    if (i < active) {
      items[i].style.transform = `translateX(${-150 * stt}px) scale(${
        1 - 0.2 * stt
      }) perspective(16px) rotateY(1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = `blur(5px)`;
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  }
  if (active == 0) {
    items[items.length - 1].style.transform = `translateX(-150px) scale(0.8
            ) perspective(16px) rotateY(1deg)`;
    items[items.length - 1].style.zIndex = -1;
    items[items.length - 1].style.opacity = 0.6;
    items[items.length - 2].style.transform = `translateX(-300px) scale(0.6
            ) perspective(16px) rotateY(1deg)`;
    items[items.length - 2].style.zIndex = -2;
    items[items.length - 2].style.opacity = 0.6;
  }
  if (active == 1) {
    items[items.length - 1].style.transform = `translateX(-300px) scale(0.6
            ) perspective(16px) rotateY(1deg)`;
    items[items.length - 1].style.zIndex = -1;
    items[items.length - 1].style.opacity = 0.6;
  }
  if (active == items.length - 1) {
    items[0].style.transform = `translateX(150px) scale(0.8
            ) perspective(16px) rotateY(-1deg)`;
    items[0].style.zIndex = -1;
    items[0].style.opacity = 0.6;
    items[1].style.transform = `translateX(300px) scale(0.6
            ) perspective(16px) rotateY(-1deg)`;
    items[1].style.zIndex = -2;
    items[1].style.opacity = 0.6;
  }
  if (active == items.length - 2) {
    items[0].style.transform = `translateX(300px) scale(0.6
            ) perspective(16px) rotateY(-1deg)`;
    items[0].style.zIndex = -1;
    items[0].style.opacity = 0.6;
  }
}
loadShow();
next.onclick = function () {
  active = active + 1 < items.length ? active + 1 : active;
  loadShow();
};
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : active;
  loadShow();
};

setInterval(() => {
  active = active + 1 < items.length ? active + 1 : 0;
  loadShow();
}, 3000);

let navs = document.getElementsByClassName("navs");
let cel = document.getElementById("navitems");
let menu = document.getElementById("menu");

menu.onclick = function () {
  if (menu.classList.contains("bars")) {
    cel.classList.add("appear");
    cel.classList.remove("disappear");
    setTimeout(() => {
      menu.classList.remove("bars");
      menu.classList.add("xmark");
      menu.classList.remove("zero");
    }, 100);
  } else {
    cel.classList.add("disappear");
    setTimeout(() => {
      menu.classList.remove("xmark");
      menu.classList.add("bars");
      menu.classList.remove("zero");
      cel.classList.remove("appear");
    }, 100);
  }
};

for (var j = 0; j < navs.length; j++) {
  navs[j].onclick = () => {
    cel.classList.add("disappear");
    menu.classList.add("zero");
    setTimeout(() => {
      menu.classList.remove("xmark");
      menu.classList.add("bars");
      menu.classList.remove("zero");
    }, 100);
    cel.classList.add("remove");
    setTimeout(() => {
      cel.classList.remove("show");
      cel.classList.remove("remove");
      cel.classList.remove("appear");
    }, 300);
  };
}

let c = document.getElementsByClassName("card");
let Y = window.innerHeight;
window.addEventListener("scroll", () => {
  cel.classList.add("disappear");
  menu.classList.add("zero");
  setTimeout(() => {
    menu.classList.remove("xmark");
    menu.classList.add("bars");
    menu.classList.remove("zero");
  }, 100);
  var k = c[0].getBoundingClientRect().top;
  if (k <= -150) c[0].classList.remove("rotate");
  else if (k <= (10 * Y) / 18) c[0].classList.add("rotate");
  else if (k >= (3 * Y) / 5) c[0].classList.remove("rotate");
});
for (let i = 0; i < c.length; i++) {
  c[i].onclick = () => {
    if (!c[i].classList.contains("rotate")) {
      c[i].classList.add("rotate");
      for (let j = 0; j < c.length; j++) {
        if (j != i && c[j].classList.contains("rotate"))
          c[j].classList.remove("rotate");
      }
    } else c[i].classList.remove("rotate");
  };
}

let test = document.querySelectorAll(".card-t");
let n = test.length;
let act = 0;
function testimonials() {
  for (let i = 0; i < n; i++) {
    test[act].style.transform = "translateX(0)";
    test[act].style.opacity = 1;
    if (i == (act + 1 < n ? act + 1 : 0))
      test[i].style.transform = "translateX(100vw)";
    else if (i == (act - 1 >= 0 ? act - 1 : n - 1))
      test[i].style.transform = "translateX(-100vw)";
  }
}
testimonials();

let nextT = document.getElementById("next-t");
let prevT = document.getElementById("prev-t");

nextT.onclick = function () {
  test[act - 1 >= 0 ? act - 1 : n - 1].style.opacity = 0;
  act = act + 1 < n ? act + 1 : 0;
  testimonials();
};
prevT.onclick = function () {
  test[act + 1 < n ? act + 1 : 0].style.opacity = 0;
  act = act - 1 >= 0 ? act - 1 : n - 1;
  testimonials();
};
