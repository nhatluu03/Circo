import {
  User,
  ArtistUser,
  ClientUser,
  AdminUser,
} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import roles from "../roles.js";
import "mongoose";
import "../utils/loadEnv.js";
import createError from "../utils/createError.js";

class UserController {
  async validatePassword(plaintPassword, hashedPassword) {
    return await bcrypt.compare(plaintPassword, hashedPassword);
  }

  grantAccess(action, resource) {
    return async (req, res, next) => {
      try {
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
          return res.status(401).json({
            error: "You don't have enough permission to perform this action",
          });
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  allowIfLoggedIn = async (req, res, next) => {
    try {
      // const user = res.locals.loggedInUser;
      // if (!user) {
      //   return res.status(401).json({
      //     error: "You need to login to access this resource",
      //   });
      // }
      // req.user = user;
      // next();
      const token = req.cookies.accessToken;
      if (!token) return next(createError(401, "You are not authenticated!"));
      jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if (error) return next(createError(403, "Token is not valid"));
        req.userId = payload.userId
        req.user = await User.findById(payload.userId)
        next();
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const { username, password, fullName, role } = req.body;

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          error: "Username already exists",
        });
      }

      // Hash the password for security
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user based on the role
      let newUser;
      switch (role) {
        case "artist":
          newUser = new ArtistUser({
            username,
            password: hashedPassword,
            fullName,
            role,
          });
          break;
        case "client":
          newUser = new ClientUser({
            username,
            password: hashedPassword,
            fullName,
            role,
          });
          break;
        case "admin":
          newUser = new AdminUser({
            username,
            password: hashedPassword,
            fullName,
            role,
          });
          break;
        default:
          return res.status(400).json({ error: "Invalid role" });
      }

      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      newUser.accessToken = accessToken;

      // Save the user to the database
      await newUser.save();

      res.status(200).json({ message: "You have registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) 
        return res.status(404).json({
          error: "User not found",
        });

      const validated = bcrypt.compareSync(req.body.password, user.password);
      if (!validated)
        return res.status(404).json({
          error: "Wrong password or username",
        });

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true, // This ensures the cookie is only accessible by the server
        secure: process.env.NODE_ENV === "production", // Use secure cookie in production
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 day in this example)
      });

      await User.findByIdAndUpdate(user._id, {
        accessToken,
      });

      res.status(200).json({
        data: {
          username: user.username,
          role: user.role,
        },
        accessToken,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  logout = async (req, res) => {
    res.clearCookie("accessToken",{
      sameSite: "none",
      secure: true,
    }).status(200).send("User has been logged out.");
  };

  index = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json("Getting all users");
  };

  show = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }
      const {accessToken, password, _id, ...userData} = user._doc
      res.status(200).send(userData);
    } catch (error) {
      next(error)
    }
  };

  update = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    if (req.user._id.toString() !== req.params.id)
      return res.status(400).send("You can update only your account");
    try {
      //Update User
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
      );
      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    //Check userOwner
    if (req.user._id.toString() !== req.params.id)
      return res.status(400).send("You can delete only your account");
    try {
      //Delete user
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User has been deleted");
    } catch (error) {
      next(error)
    }
  };
}

export default new UserController();
