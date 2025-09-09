import Cookies from 'js-cookie';
import { getUserData, changeName } from '../fetchFuncs';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getUserData();
  document.querySelector('#id-settingsPage-input').value = data.name;
});
document.querySelector('#id-exitSettings-button').addEventListener('click', () => {
  window.location.href = '/index.html';
});

document.querySelector('#id-settingsPage-button').addEventListener('click', async () => {
  const newName = document.querySelector('#id-settingsPage-input').value;
  const status = await changeName(newName);
  if (status) {
    window.location.href = '/index.html';
  } else {
    document.querySelector('#id-settingsPage-input').classList.add('err-occured');
  }
  // localStorage.removeItem('name');
  // localStorage.setItem('name', newName);
  // window.location.href = '/index.html';
});
