import { URL } from './const';
import Cookies from 'js-cookie';
import { format } from 'date-fns';

let socket;

export async function sendRequest(url, method, body, headers) {
  const options = {
    method: method,
    headers: headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserData(token) {
  if (!token) {
    token = Cookies.get('code');
  }
  const headers = { Authorization: `Bearer ${token}` };

  return sendRequest(URL.API.USER_ME, 'GET', null, headers);
}

export async function sendEmail(email) {
  const headers = { 'Content-Type': 'application/json' };

  return sendRequest(URL.API.USER, 'POST', { email: email }, headers);
}

export async function getMessageHistory() {
  const token = Cookies.get('code');

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  return sendRequest(URL.API.MESSAGES, 'GET', null, headers);
}

export async function changeName(name) {
  const token = Cookies.get('code');

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  return sendRequest(URL.API.USER, 'PATCH', { name: name }, headers);
}

export function connectWebSocket() {
  try {
    const token = Cookies.get('code');
    if (!socket || socket?.readyState != 1) {
      socket = new WebSocket(`wss://edu.strada.one/websockets?` + token);
    } else {
      return;
    }

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
}

export function sendMessage(message) {
  document.querySelector('#id-send-input').classList.remove('no-input-value');
  if (message.trim() === '') {
    document.querySelector('#id-send-input').classList += 'no-input-value';
    return;
  }
  connectWebSocket();

  socket.send(JSON.stringify({ text: `${message}` }));
}

export function addMessage(data, isLive) {
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

export function scrollMessages(isSmooth) {
  const options = { top: document.querySelector('#id-main-chatPage-messages-list').clientHeight };
  if (isSmooth) {
    options.behavior = 'smooth';
  }
  document.querySelector('#id-main-chatPage').scrollBy(options);
}

export async function addHistory() {
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
