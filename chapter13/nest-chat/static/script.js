const socket = io('http://localhost:3000/chat');
const nickname = prompt('닉네임을 입력해주세요.');
const roomSocket = io('http://localhost:3000/room');
let currentRoom = '';

socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
});
socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  if (currentRoom === '') {
    alert('방을 선택해주세요.');
    return;
  }
  const message = $('#message').val();
  const data = { message, nickname, room: currentRoom };

  $('#chat').append(`<div>나 : ${message}</div>`);
  // socket.emit('message', { message, nickname });
  roomSocket.emit('message', data);
  return false;
}

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', { room, nickname });
}

roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onclick="joinRoom('${room}')">join</button>`,
    );
  });
});

roomSocket.on('message', (data) => {
  console.log(data);
  $(`#chat`).append(`<div>${data.message}</div>`);
});

socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</dive>`);
});

function joinRoom(room) {
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').html('');
  currentRoom = room;
}
