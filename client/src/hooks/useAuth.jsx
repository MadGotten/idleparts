import getCsrfToken from './useCsrfToken';

export async function getUser() {
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/users/authenticate`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
  });

  const user = await response?.json();
  return user;
}

export async function loginUser(email, password) {
  const csrfToken = await getCsrfToken();
  console.log(csrfToken);

  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const user = await response?.json();
  return user;
}

export async function registerUser(email, password, password2) {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
      password2,
    }),
  });

  const user = await response?.json();
  return user;
}

export async function logoutUser() {
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/users/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
    cache: 'no-cache',
  });

  const data = await response?.json();
  return data;
}
