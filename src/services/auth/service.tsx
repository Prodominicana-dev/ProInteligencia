import axios from "axios";

export async function generateToken() {
  var options = {
    method: "POST",
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: `${process.env.API_CLIENT_ID}`,
      client_secret: `${process.env.API_CLIENT_SECRET}`,
      audience: `${process.env.API_IDENTIFIER}`,
    }),
  };
  const { data } = await axios.request(options);
  return data.access_token;
}

export async function getPermissions(token: string, url: string) {
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getDomains(url: string) {
  return await axios.get(url);
}
