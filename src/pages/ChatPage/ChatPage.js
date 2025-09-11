import { connectWebSocket, getMessageHistory, sendMessage, addMessage, scrollMessages, addHistory } from '../funcs';
import Cookies from 'js-cookie';

document.addEventListener('DOMContentLoaded', async () => {
  if (!Cookies.get('code') && !Cookies.get('userEmail')) {
    window.location.replace('/AuthPage.html');
  }

  const response = await getMessageHistory();
  const messagesHistory = await response.json();
  localStorage.setItem('messageHistory', JSON.stringify(messagesHistory));
  localStorage.setItem('messagesCount', 0);

  addHistory();
  scrollMessages(false);

  connectWebSocket();
});

document.querySelector('#id-main-chatPage').onscroll = (e) => {
  const messagewWindow = document.querySelector('#id-main-chatPage');
  const messageList = document.querySelector('#id-main-chatPage-messages-list');
  const scrollButton = document.querySelector('#id-main-chatPage-messages-scroll-button');
  scrollButton.style.display = 'none';
  if (messagewWindow.scrollTop < messagewWindow.clientHeight) {
    addHistory();
  }
  if (messageList.scrollHeight - (messagewWindow.scrollTop + messagewWindow.clientHeight) >= 0) {
    scrollButton.style.display = 'block';
    scrollButton.onclick = (e) => {
      scrollMessages(true);
    };
  }
};

document.querySelector('#id-send-button').addEventListener('click', () => {
  const message = document.querySelector('#id-send-input').value;
  sendMessage(message);
  document.querySelector('#id-send-input').value = '';
});

document.addEventListener('keydown', (e) => {
  if (e.code == 'Enter') {
    const message = document.querySelector('#id-send-input').value;
    sendMessage(message);
    document.querySelector('#id-send-input').value = '';
  }
});

document.querySelector('#id-toSettings-button').addEventListener('click', () => {
  window.location.href = '/SettingsPage.html';
});
document.querySelector('#id-exit-button').addEventListener('click', () => {
  window.location.href = '/AuthPage.html';
});
