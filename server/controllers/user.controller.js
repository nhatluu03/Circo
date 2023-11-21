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

class UserController {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

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
      const user = res.locals.loggedInUser;
      if (!user) {
        return res.status(401).json({
          error: "You need to login to access this resource",
        });
      }
      req.user = user;
      next();
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
      const hashedPassword = await this.hashPassword(password);

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
      if (!user) return next(new Error("User not found"));

      const validPassword = await this.validatePassword(
        password,
        user.password
      );
      if (!validPassword) return next(new Error("Invalid password"));

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

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

  index = async (req, res, next) => {
    const users = await User.find()
    res.status(200).json("Getting all users");
  };

  show = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  };

  update = async (req, res, next) => {
    try {
      
      //Update User
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        //Check if there is an error
        (err, updatedUser) => {
          if(err){
            console.error('Error updating user:', err);
          } else{
            console.log('Updated user', updatedUser);
          }
        }
      );
      res.status(200).send(updatedUser);
    }catch (error) {
      next(error)
    }
  };

  destroy = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    //Check userOwner
    if(user._id !== req.params.id)
      return res.status(400).send("You can delete only your account");
    //Delete user
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted");
  };
}

export default new UserController();
