import Cookies from 'js-cookie';

export async function getUserData() {
  const token = Cookies.get('code');
  const response = await fetch('https://edu.strada.one/api/user/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function sendEmail(email) {
  let response = await fetch('https://edu.strada.one/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: `${email}` }),
  });
}
export async function getMessageHistory() {
  const token = Cookies.get('code');
  let response = await fetch('https://edu.strada.one/api/messages', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  response = await response.json();
  return response;
}

export async function changeName(name) {
  const token = Cookies.get('code');
  const response = await fetch('https://edu.strada.one/api/user', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: `${name}` }),
  });
  return response.ok;
}
