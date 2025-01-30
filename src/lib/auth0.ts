let token: string | null = null;
let tokenCreated: Date | null = null;

export async function auth0GetUserByAccessToken(accessToken: string) {
  const response = await fetch(process.env.AUTH0_ISSUER_BASE_URL as string + '/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const userInfo = await response.json();
  console.log(userInfo);

  return {
    id: userInfo.sub,
    firstName: userInfo.given_name,
    lastName: userInfo.family_name,
    email: userInfo.email,
  }
}

export async function auth0UpdateUser(userId: string, data: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  const managementToken = await getManagementToken();

  const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${managementToken}`,
    },
    body: JSON.stringify({
      family_name: data.lastName,
      given_name: data.firstName,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("this error: ", errorData);
    throw new Error('Failed to update user');
  }

  const user = await response.json();
  return {
    id: user.user_id,
    firstName: user.given_name,
    lastName: user.family_name,
    name: user.name,
    email: user.email,
  };
}

export async function auth0UpdatePassword(userId: string, password: string) {
  const managementToken = await getManagementToken();

  const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${managementToken}`,
    },
    body: JSON.stringify({
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("this error: ", errorData);
    throw new Error('Failed to update password');
  }

  const user = await response.json();
  return {
    id: user.user_id,
    firstName: user.given_name,
    lastName: user.family_name,
    email: user.email,
  };
}

// Management API Access



export async function refreshManagementApiToken(): Promise<string | null> {
  const options = {
    method: "POST",
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    headers: { "content-type": "application/json" },
    body: `{"client_id":"${process.env.AUTH0_CLIENT_ID}","client_secret":"${process.env.AUTH0_CLIENT_SECRET}","audience":"${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/","grant_type":"client_credentials"}`,
  };

  console.log('new token options: ', options)

  return fetch(options.url, {
    method: options.method,
    headers: options.headers,
    body: options.body,
  })
    .then(async(response) => {

      token = (await response.json()).access_token;
      tokenCreated = new Date();
      return token;
    })
    .catch((error) => {
      console.log('new token error: ', error)
      return error;
    });
}

export async function getManagementToken() {
  // if token is older than 24 hours, refresh it.
  if (!token || !tokenCreated || new Date().getTime() - tokenCreated.getTime() > 24 * 60 * 60 * 1000) {
    token = await refreshManagementApiToken();
  }
  return token;
}