import axios from "axios";
export default function AccessToken() {
  var options = {
    method: "POST",
    url: "https://prodominicana.us.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.API_CLIENT_ID,
      client_secret: process.env.API_CLIENT_SECRET,
      audience: process.env.API_IDENTIFIER,
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
}
