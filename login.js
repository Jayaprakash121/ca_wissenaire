function extractAccessTokenFromURL() {
  var hash = window.location.hash.substring(1);
  var params = new URLSearchParams(hash);
  return params.get("access_token");
}

function getUserData(accessToken) {
  fetch("https://www.googleapis.com/drive/v3/about", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User Data:", data);
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id:
      "160027367801-m3en2sdk8jhikuhupe5sqnd9urot9dlp.apps.googleusercontent.com",

    redirect_uri: "https://ca.wissenaire.org/Contact-form/dist/index.html",
    response_type: "token",
    scope: "profile email",
    state: "pass-through value",
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

// Entry point after redirect
function handleOAuthRedirect() {
  var accessToken = extractAccessTokenFromURL();
  if (accessToken) {
    getUserData(accessToken);
  } else {
    console.error("No access token found in the URL.");
  }
}

// Call the function to handle the redirect
handleOAuthRedirect();
