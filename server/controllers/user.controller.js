import {
  User,
  TalentUser,
  ClientUser,
  AdminUser,
} from "../models/user.model.js";
import Artwork from "../models/artwork.model.js";
import Commission from "../models/commission.model.js";
import Order from "../models/order.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import roles from "../roles.js";
import "mongoose";
import "../utils/loadEnv.js";
import createError from "../utils/createError.js";
import "cookie-parser";

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
      // console.log(req.cookies)
      const token = req.cookies.accessToken;
      console.log(token);
      if (!token) return next(createError(401, "You are not authenticated!"));
      jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if (error) return next(createError(403, "Token is not valid"));
        req.userId = payload.userId;
        req.user = await User.findById(payload.userId);

        // Check if user exists
        if (!req.user) {
          return next(createError(404, "User not found"));
        }
        next();
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const { username, password, fullname, role } = req.body;

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({
          error: "Username already exists",
        });
      }

      // Hash the password for security
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user based on the role
      let newUser;
      switch (role) {
        case "talent":
          newUser = new TalentUser({
            username,
            password: hashedPassword,
            fullname,
            role,
          });
          break;
        case "client":
          newUser = new ClientUser({
            username,
            password: hashedPassword,
            fullname,
            role,
          });
          break;
        case "admin":
          newUser = new AdminUser({
            username,
            password: hashedPassword,
            fullname,
            role,
          });
          break;
        default:
          return res.status(400).json({ error: "Invalid role" });
      }

      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "90d" }
      );
      newUser.accessToken = accessToken;

      // Save the user to the database
      await newUser.save();
      const { password: userPassword, ...others } = newUser._doc;

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true, // This ensures the cookie is only accessible by the server
          maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 day in this example)
        })
        .status(200)
        .send(others);

      // res.status(200).json({ message: "You have registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
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
      const { password, ...others } = user._doc;
      res.cookie("accessToken", accessToken, {
        httpOnly: true, // This ensures the cookie is only accessible by the server
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 day in this example)
      });
      res.status(200).send(others);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  logout = async (req, res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  };

  index = async (req, res, next) => {
    try {
      const talents = await User.find({ role: "talent" });
      const result = [];
  
      // Iterate through each talent
      for (var i = 0; i < talents.length; i++) {
        const talent = talents[i];
  
        // Find the top 3 recent artworks loved by other people for each talent
        const top3RecentArtworks = await Artwork.find({ talent: talent._id })
          .sort({ createdAt: -1 }) // Sort by createdAt in descending order for getting recent artworks
          .limit(3)
          .exec();
  
        // Count the number of commissions for each talent
        const commissions = await Commission.countDocuments({
          talent: talent._id,
        });
  
        // Push talent's information, top 3 recent artworks, and commission count to the result array
        result.push({
          talent,
          top3RecentArtworks: top3RecentArtworks.map((artwork) => ({
            _id: artwork._id,
            image: artwork.images[0],
          })),
          commissions: commissions,
        });
      }
  
      // Send the result as JSON response
      res.status(200).json(result);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getTalentsByFilters = async (req, res, next) =>{
    const q = req.query;
    const filters = {
      ...(q.creative && { creativeFields: q.creative }),
      ...(q.badges && { badges: q.badges }),
      ...((q.rating) && { rating: q.rating }),
      ...(q.search && { username: { $regex: q.search, $options: "i" } }),
    };
    try {
      const talents = await User.find(filters).sort({ [q.sort]: -1 });
      res.status(200).send(talents);
    } catch (error) {
      next(error);
    }
  }

  show = async (req, res, next) => {
    const targetUserId = req.params.id;
    const currentUserId = res.query?.userId;
    // console.log("TARGETUSERID: " + targetUserId);
    // console.log("USERID: " + currentUserId);

    try {
      const targetUser = await User.findById(targetUserId);
      const currentUser = await User.findById(currentUserId);
      // console.log("targetUser: " + targetUser);
      // console.log("currentUser: " + currentUser);
      // console.log(currentUser);

      // Check if user exists
      if (!targetUser) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      // // Check view profile privillidges
      // if (
      //   !(
      //     (!currentUser && targetUser.role == "talent") ||
      //     targetUser.role == "talent" ||
      //     (currentUserId == targetUserId && currentUser.role == "client") ||
      //     currentUser.role == "admin"
      //   )
      // ) {
      //   return res.status(400).json({
      //     error: "You cannot view this profile",
      //   });
      // }

      const { accessToken, password, updatedAt, ...other } = targetUser._doc;
      res.status(200).json(other);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log(req.body);
    console.log("BACKGROUND PHOTO: " + req.body.bg);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    if (req.user._id.toString() !== req.params.id)
      return res.status(400).send("You can update your account only");
    try {
      //Update User
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
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
      next(error);
    }
  };

  // Additional methods
  editCover = async (req, res) => {
    console.log(req.file);
    res.status(200).json({ url: req.file.filename });
  };

  getFeedbacks = async (req, res, next) => {
    try {
      // Find all orders where the talent's ID is in the items.itemId field
      const orders = await Order.model("Order").find({
        "items.itemId": this._id,
        rating: { $exists: true }, // Filter orders with ratings
        review: { $exists: true }, // Filter orders with reviews
      }).populate({
        path: 'client',
        select: 'fullname username avatar', // Specify the fields you want to select
      });;
  
      // Extract ratings and reviews from orders
      const feedbacks = orders.map((order) => ({
        rating: order.rating,
        review: order.review,
      }));
      console.log(feedbacks)
      res.status(200).json(feedbacks);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
