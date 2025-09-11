import { getUserData, changeName } from '../funcs';

document.addEventListener('DOMContentLoaded', async () => {
  const response = await getUserData();
  const data = await response.json();
  document.querySelector('#id-settingsPage-input').value = data.name;
});
document.querySelector('#id-exitSettings-button').addEventListener('click', () => {
  window.location.href = '/index.html';
});

document.querySelector('#id-settingsPage-button').addEventListener('click', async () => {
  const newName = document.querySelector('#id-settingsPage-input').value;
  if (!newName) {
    document.querySelector('#id-settingsPage-input').classList.add('err-occured');
    return;
  }

  const response = await changeName(newName);
  if (response.statusText != 'OK') {
    document.querySelector('#id-settingsPage-input').classList.add('err-occured');
    return;
  } else {
    window.location.href = '/index.html';
  }
});
