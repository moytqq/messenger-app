import { format } from 'date-fns';

function addMessage(text, isSend) {
  const newMessageElement = document.createElement('div');
  const newMessageText = document.createElement('div');
  const newMessageTime = document.createElement('div');

  newMessageText.className = 'main__message--text';
  if (isSend) {
    newMessageText.textContent = localStorage.getItem('name') + ': ' + text;
  } else {
    newMessageText.textContent = 'Имя отправителя: ' + text;
  }

  newMessageTime.className = 'main__message--time';
  newMessageTime.textContent = format(new Date(), 'HH:mm');

  newMessageElement.append(newMessageText, newMessageTime);
  newMessageElement.className = `main__message ${isSend ? 'main__message--send' : 'main__message--recived'}`;

  document.querySelector('#id-main-chatPage').append(newMessageElement);
}

document.querySelector('#id-send-button').addEventListener('click', () => {
  const message = document.querySelector('#id-send-input').value;
  if (message.trim() === '') return;
  addMessage(message, true);
  document.querySelector('#id-send-input').value = '';
});
document.addEventListener('keydown', () => {
  if (event.code == 'Enter') {
    const message = document.querySelector('#id-send-input').value;
    if (message.trim() === '') return;
    addMessage(message, true);
    document.querySelector('#id-send-input').value = '';
  }
});
setTimeout(() => {
  addMessage('Полученное сообщение', false);
}, 1000);

document.querySelector('#id-toSettings-button').addEventListener('click', () => {
  window.location.href = '/SettingsPage.html';
});
document.querySelector('#id-exit-button').addEventListener('click', () => {
  window.location.href = '/AuthPage.html';
});
