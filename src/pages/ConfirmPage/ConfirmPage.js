import Cookies from 'js-cookie';

document.querySelector('#id-exitConfirm-button').addEventListener('click', () => {
  window.location.href = '/index.html';
});

document.querySelector('#id-confirmPage-buttonGetCode').addEventListener('click', () => {
  const code = document.querySelector('#id-confirmPage-input').value;
  if (!code) {
    document.querySelector('#id-confirmPage-input').classList.add('no-input-value');
    return;
  } else {
    Cookies.set('code', `${code}`);
    window.location.href = '/index.html';
  }
});
