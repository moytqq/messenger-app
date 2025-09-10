import Cookies from 'js-cookie';

document.querySelector('#id-exitAuth-button').addEventListener('click', () => {
  window.location.href = '/index.html';
});
document.querySelector('#id-authPage-buttonSendCode').addEventListener('click', () => {
  window.location.href = '/ConfirmPage.html';
});

async function sendEmail(email) {
  let response = await fetch('https://edu.strada.one/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: `${email}` }),
  });
  return response.status;
}

document.querySelector('#id-authPage-buttonGetCode').addEventListener('click', () => {
  const email = document.querySelector('#id-authPage-input').value;
  if (sendEmail(email)) {
    Cookies.set('userEmail', `${email}`);
  }
  window.location.href = '/ConfirmPage.html';
});
