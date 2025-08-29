document.addEventListener('DOMContentLoaded', () => {
  const name = localStorage.getItem('name');
  if (name) {
    document.querySelector('#id-settingsPage-input').value = name;
  }
});
document.querySelector('#id-exitSettings-button').addEventListener('click', () => {
  window.location.href = '/index.html';
});

document.querySelector('#id-settingsPage-button').addEventListener('click', () => {
  const newName = document.querySelector('#id-settingsPage-input').value;
  localStorage.removeItem('name');
  localStorage.setItem('name', newName);
  window.location.href = '/index.html';
});
