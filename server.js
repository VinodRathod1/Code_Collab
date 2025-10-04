const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const axios = require('axios');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

const PORT = process.env.PORT || 5000;

const userSocketMap = {};
// **New**: Track latest code per room
const roomCodeMap = {};

const ACTIONS = {
  JOIN: 'join',
  JOINED: 'joined',
  DISCONNECTED: 'disconnected',
  CODE_CHANGE: 'code-change',
  SYNC_CODE: 'sync-code',
};

// Middleware
app.use(cors());
app.use(express.json());

// Judge0 code execution endpoint
const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com';
const RAPID_API_KEY = '00b0596474msh82f909ed6a70c20p1b74a6jsn6bfd53f29235';

app.post('/execute', async (req, res) => {
  const { code, language_id, stdin } = req.body;
  if (!code || !language_id) {
    return res.status(400).json({ error: 'Missing code or language_id' });
  }
  try {
    const response = await axios.post(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
      { source_code: code, language_id, stdin },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Execution error:', err?.response?.data || err.message);
    res.status(500).json({ error: err?.response?.data || 'Execution failed' });
  }
});

// Serve React frontend
app.use(express.static('build'));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Helper to list clients in a room
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(socketId => ({
    socketId,
    username: userSocketMap[socketId],
  }));
}

io.on('connection', socket => {
  console.log('🔌 Socket connected:', socket.id);


  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    // Notify everyone in room
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });


    const existingCode = roomCodeMap[roomId];
    if (typeof existingCode === 'string') {
      socket.emit(ACTIONS.CODE_CHANGE, { code: existingCode });
    }
  });

  // CODE_CHANGE: update server cache + broadcast
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    roomCodeMap[roomId] = code;
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });
  // SYNC_CODE: send latest code to a specific socket
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach(roomId => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
