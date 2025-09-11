import { sendEmail } from '../funcs';
import Cookies from 'js-cookie';

document.querySelector('#id-exitAuth-button').addEventListener('click', () => {
  window.location.href = '/index.html';
});
document.querySelector('#id-authPage-buttonSendCode').addEventListener('click', () => {
  window.location.href = '/ConfirmPage.html';
});

document.querySelector('#id-authPage-buttonGetCode').addEventListener('click', async () => {
  const email = document.querySelector('#id-authPage-input').value;
  const response = await sendEmail(email);

  if (response.statusText == 'OK') {
    Cookies.set('userEmail', `${email}`);
    window.location.href = '/ConfirmPage.html';
  }
});
