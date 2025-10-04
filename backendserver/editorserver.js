const express = require("express");
const axios = require("axios");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins for testing; restrict in production
    methods: ["GET", "POST"]
  }
});

const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";
const RAPID_API_KEY = "00b0596474msh82f909ed6a70c20p1b74a6jsn6bfd53f29235";

// Code execution route
app.post("/execute", async (req, res) => {
  const { code, language_id, stdin } = req.body;
  if (!code || !language_id) return res.status(400).json({ error: "Missing code or language_id" });

  try {
    const response = await axios.post(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
      { source_code: code, language_id, stdin },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Execution error:", err?.response?.data || err.message);
    res.status(500).json({ error: err?.response?.data || "Execution failed" });
  }
});

// Socket.io logic
const ACTIONS = {
  JOIN: "join",
  JOINED: "joined",
  DISCONNECTED: "disconnected",
  CODE_CHANGE: "code-change",
  SYNC_CODE: "sync-code",
};

const userSocketMap = {}; // socketId -> username

io.on("connection", (socket) => {
  console.log("⚡ New socket connected:", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => ({
      socketId,
      username: userSocketMap[socketId],
    }));

    // Notify others
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
  });
});

server.listen(PORT, () => console.log(`⚙️  Server running at http://localhost:${PORT}`));
