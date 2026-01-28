// frontend/js/webrtc.js
// Include socket.io client via CDN or bundle:
// <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script> (add to student.html if not bundling)

let socket;
let localStream;
let peerConnection;
let currentRoomId;

const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

function initSocket() {
  socket = io('http://localhost:8000', { transports: ['websocket'] });

  socket.on('user-joined', ({ userId, role }) => {
    logChat(`🔵 ${role} joined: ${userId}`);
  });

  socket.on('webrtc-offer', async ({ sdp, from }) => {
    if (!peerConnection) createPeer();
    await peerConnection.setRemoteDescription(sdp);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('webrtc-answer', { roomId: currentRoomId, sdp: answer, from: 'student' });
  });

  socket.on('webrtc-answer', async ({ sdp }) => {
    await peerConnection.setRemoteDescription(sdp);
    setStatus('Connected');
  });

  socket.on('webrtc-ice', async ({ candidate }) => {
    try { await peerConnection.addIceCandidate(candidate); } catch (e) { console.error(e); }
  });

  socket.on('room-chat', ({ message, from }) => {
    logChat(`${from}: ${message}`);
  });

  socket.on('end-call', () => {
    endCall();
  });
}

function createPeer() {
  peerConnection = new RTCPeerConnection(servers);

  peerConnection.ontrack = (event) => {
    document.getElementById('remoteVideo').srcObject = event.streams[0];
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('webrtc-ice', { roomId: currentRoomId, candidate: event.candidate, from: 'student' });
    }
  };
}

async function joinRoom() {
  if (!socket) initSocket();
  currentRoomId = document.getElementById('roomId').value.trim();
  if (!currentRoomId) return alert('Enter Room ID');
  socket.emit('join-room', { roomId: currentRoomId, userId: localStorage.getItem('email'), role: 'student' });
  setStatus(`Joined room ${currentRoomId}`);
}

async function startCall() {
  if (!socket) initSocket();
  if (!currentRoomId) return alert('Join a room first');

  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.getElementById('localVideo').srcObject = localStream;

  createPeer();
  localStream.getTracks().forEach(t => peerConnection.addTrack(t, localStream));

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit('webrtc-offer', { roomId: currentRoomId, sdp: offer, from: 'student' });
  setStatus('Calling...');
}

async function shareScreen() {
  if (!peerConnection) return alert('Start call first');
  const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  const screenTrack = screenStream.getVideoTracks()[0];

  const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
  if (sender) sender.replaceTrack(screenTrack);

  screenTrack.onended = () => {
    const camTrack = localStream.getVideoTracks()[0];
    if (sender && camTrack) sender.replaceTrack(camTrack);
  };
}

function sendRoomChat() {
  const input = document.getElementById('roomChatInput');
  const msg = input.value.trim();
  if (!msg || !currentRoomId) return;
  socket.emit('room-chat', { roomId: currentRoomId, message: msg, from: 'Student' });
  logChat(`You: ${msg}`);
  input.value = '';
}

function endCall() {
  if (peerConnection) peerConnection.close();
  peerConnection = null;
  if (localStream) localStream.getTracks().forEach(t => t.stop());
  localStream = null;
  setStatus('Call ended');
}

function setStatus(s) {
  document.getElementById('callStatus').textContent = s;
}

function logChat(line) {
  const log = document.getElementById('roomChatLog');
  const p = document.createElement('p');
  p.textContent = line;
  log.appendChild(p);
}

// expose
window.joinRoom = joinRoom;
window.startCall = startCall;
window.shareScreen = shareScreen;
window.sendRoomChat = sendRoomChat;
window.endCall = endCall;
