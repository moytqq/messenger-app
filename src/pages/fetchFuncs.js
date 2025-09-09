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

async function sendEmail(email) {
  let response = await fetch('https://edu.strada.one/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: `${email}` }),
  });
}
async function messageHistory() {
  const token = Cookies.get('code');
  await fetch('https://mighty-cove-31255.herokuapp.com/api/messages', {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
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
