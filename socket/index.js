// Import necessary modules
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
    }
  });
  

// Handle connection events
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle custom events or communication here

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the HTTP server
const PORT = 8900;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});


