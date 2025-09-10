import { format } from 'date-fns';
import { getMessageHistory } from '../fetchFuncs';
import Cookies from 'js-cookie';

let socket;

document.addEventListener('DOMContentLoaded', async () => {
  if (!Cookies.get('code') && !Cookies.get('userEmail')) {
    window.location.replace('/AuthPage.html');
  }

  const messagesHistory = await getMessageHistory();
  localStorage.setItem('messageHistory', JSON.stringify(messagesHistory));
  localStorage.setItem('messagesCount', 0);

  addHistory();
  scrollMessages(false);

  connectWebSocket();
});

const connectWebSocket = async () => {
  try {
    const token = Cookies.get('code');
    socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);

    socket.onopen = () => {
      console.log('Соединение открыто');
    };

    socket.onmessage = function (e) {
      console.log(e.data);
      let data = JSON.parse(e.data);
      addMessage(data, true);
    };

    socket.onerror = (error) => {
      console.error('Ошибка соединения:', error);
    };
  } catch (error) {
    console.error('Ошибка создания WebSocket:', error);
  }
};

async function addHistory() {
  const history = JSON.parse(localStorage.getItem('messageHistory'));
  const firstIndex = Number(localStorage.getItem('messagesCount'));
  localStorage.setItem('messagesCount', firstIndex + 19);
  const lastIndex = Number(localStorage.getItem('messagesCount'));

  history.messages.forEach((item, index) => {
    if (index < firstIndex || index > lastIndex) {
      return;
    } else {
      addMessage(item, false);
    }
  });
}

function sendMessage(message) {
  document.querySelector('#id-send-input').classList.remove('no-input-value');
  if (message.trim() === '') {
    document.querySelector('#id-send-input').classList += 'no-input-value';
    return;
  }
  console.log(socket.readyState);
  if (socket.readyState != 1) {
    socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
  }
  socket.send(JSON.stringify({ text: `${message}` }));
}

function addMessage(data, isLive) {
  const sendByCurrUser = data.user.email == Cookies.get('userEmail');
  const newMessageElement = template.content.cloneNode(true);

  newMessageElement.firstElementChild.textContent = data.user.name + ': ' + data.text;
  newMessageElement.lastElementChild.textContent = format(data.createdAt, 'dd.MM, HH:mm');

  const li = document.createElement('li');
  li.className = `main__message  ${data.user.email == Cookies.get('userEmail') ? 'main__message--send' : 'main__message--recived'}`;
  li.append(newMessageElement);
  if (isLive) {
    document.querySelector('#id-main-chatPage-messages-list').prepend(li);
    if (sendByCurrUser) {
      scrollMessages(true);
    }
  } else {
    document.querySelector('#id-main-chatPage-messages-list').append(li);
  }
}

function scrollMessages(isSmooth) {
  const options = { top: document.querySelector('#id-main-chatPage-messages-list').clientHeight };
  if (isSmooth) {
    options.behavior = 'smooth';
  }
  document.querySelector('#id-main-chatPage').scrollBy(options);
}

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
