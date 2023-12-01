import { User } from "./models/user.model.js";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import roles from "./roles.js";
import path from "path";
import route from "./routes/index.js";
import "./utils/loadEnv.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

const app = express();
//Socket.io
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("chat message", (msg) => {
    // Broadcast the message to all connected clients
    io.emit("chat message", msg);
  });

  // Handle other events...

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to the Database successfully");
});

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
      res.locals.loggedInUser = await User.findById(userId);

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

route(app);

app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});
