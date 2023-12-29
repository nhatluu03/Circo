import { createServer } from "http";
import { Server } from "socket.io";

// Create an HTTP server
const httpServer = createServer();

// Configure CORS for Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};


// Handle connection events
io.on("connection", (socket) => {
  console.log("A user connected");
  //Take userId and socketId form user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(users)
    io.emit("getUsers", users);
  });
  // Send and get messages
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage",{
        senderId,
        content,
    })
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Start the HTTP server
const PORT = 8900;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
