const emailInput = document.getElementById("emailInput");

function extractAccessTokenFromURL() {
  var hash = window.location.hash.substring(1);
  var params = new URLSearchParams(hash);
  return params.get("access_token");
}

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

function getUserData(accessToken) {
  fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const { email } = data;
      console.log(data);
      emailInput.value = email;
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

getUserData(extractAccessTokenFromURL());
