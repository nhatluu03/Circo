import mongoose from "mongoose";
import Artwork from "../models/artwork.model.js";
import { User } from "../models/user.model.js";
import createError from "../utils/createError.js";
import Field from "../models/field.model.js";

class ArtworkController {
  isOwner = (artwork, userId) => {
    return artwork.talent.toString() === userId.toString();
  };

  index = async (req, res) => {
    const { forSelling } = req.query;

    try {
      let artworks;
      if (forSelling) {
        artworks = await Artwork.find({
          forSelling: true,
        }).populate("fields", "name");
        // .populate({
        //   path: "Field",
        //   select: "_id title"
        // });
      } else {
        // Use populate to get artworks along with the corresponding talent
        artworks = await Artwork.find().populate({
          path: "talent",
          select: "avatar username", // get the fields avatar and username only
        });
      }

      console.log(artworks);
      res.status(200).json(artworks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  store = async (req, res, next) => {
    const user = req.user;
    if (user.role === "client") {
      return res.status(400).json({
        error: "You don't have enough permission to create artwork",
      });
    }

    let { fieldId, ...artworkData } = req.body; // Destructure talent, field from req.body
    let newArtworkData = {
      talent: user._id, // Convert talent to ObjectId
      ...artworkData,
    };

    if (fieldId) {
      const field = Field.findById(fieldId);
      newArtworkData.field = field;
    }
    const artwork = new Artwork(newArtworkData);

    try {
      const newArtwork = await artwork.save();
      res.status(201).json(newArtwork);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const artwork = await Artwork.findById(req.params.id);
      if (!artwork) {
        return res.status(404).json({
          error: "Artwork not found",
        });
      }
      res.status(200).json(artwork);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const artwork = await Artwork.findById(req.params.id);
    //Check if artwork exists
    if (!artwork) {
      return res.status(404).json({
        error: "Artwork not found",
      });
    }
    //Check if the talent is the artwork's owner
    if (!this.isOwner(artwork, req.user._id))
      return res.status(404).json({
        error: "You do not have enough permission to update this artwork",
      });
    try {
      const updatedArtwork = await Artwork.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedArtwork);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const artwork = await Artwork.findById(req.params.id);
      //Check if artwork exists
      if (!artwork) {
        return res.status(404).json({
          error: "Artwork not found",
        });
      }
      //Check if the talent is the artwork's owner
      if (!this.isOwner(artwork, req.user._id)) {
        return res.status(404).json({
          error: "You do not have enough permission to delete this artwork",
        });
      }
      await Artwork.findByIdAndDelete(req.params.id);

      res.status(200).json("Artwork deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  // Additional custom methods
  getArtworksByTalentId = async (req, res, next) => {
    const { talentId } = req.params;
    const { forSelling } = req.query;

    try {
      let artworks;
      if (forSelling) {
        artworks = await Artwork.find({
          talent: talentId,
          forSelling: true,
        }).populate("fields", "name");
        // .populate({
        //   path: "Field",
        //   select: "_id title"
        // });
      } else {
        artworks = await Artwork.find({
          talent: talentId,
          forSelling: false,
        }).populate("fields", "name");
        // .populate({
        //   path: "Field",
        //   select: "_id title"
        // });
      }

      // Fetch artworks associated with the specified talentId
      // console.log(artworks)
      res.status(200).json(artworks);
    } catch (error) {
      next(error);
    }
  };

  // Additional methods
  // app.post("/upload", upload.single("file"), (req, res) => {
  //   const file = req.file;
  //   res.status(200).json(file.filename);
  // });

  // uploadImages = async (req, res) => {
  //   const images = req.body.images;
  //   console.log(images)
  //   console.log(images[0])
  //   console.log(images[0].name)
  //   const fileNames = images.map(file => file.filename);

  //   try {
  //   res.status(200).json(fileNames);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ success: false, error: "Internal Server Error" });
  //   }
  // };

  uploadImages = async (req, res) => {
    try {
      console.log("REQ.FILES");
      console.log(req.files);
      // Perform any additional processing or validation here
      // const filePaths = req.files.map(file => ({ url: file.filename }));
      // res.status(200).json({ imagePaths: filePaths });
    } catch (error) {
      // Handle any errors that may occur during the upload process
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  uploadImage = async (req, res) => {
    console.log(req.file);
    res.status(200).json({ url: req.file.filename });
  };

  commentOnArtwork = async (req, res) => {
    console.log("COMMENT");
    const artworkId = req.params.id;
    const { userId, content } = req.body;

    try {
      // Find the artwork by ID
      const artwork = await Artwork.findById(artworkId);
      const user = await User.findById(userId);

      if (!artwork) {
        return res.status(404).json({ error: "Artwork not found" });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create a new comment
      const newComment = {
        user: user,
        content,
      };

      // Add the comment to the artwork's comments array
      artwork.comments.push(newComment);

      // Save the artwork with the new comment
      await artwork.save();

      return res.status(201).json(artwork);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  reactOnArtwork = async (req, res) => {
    const artworkId = req.params.id;
    const { userId, content } = req.body;

    try {
      // Find the artwork by ID
      const artwork = await Artwork.findById(artworkId);
      const user = await User.findById(userId);

      if (!artwork) {
        return res.status(404).json({ error: "Artwork not found" });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create a new comment
      const newReact = {
        user: user,
        content,
      };

      // Add the comment to the artwork's comments array
      artwork.reacts.push(newReact);

      // Save the artwork with the new comment
      await artwork.save();

      return res.status(201).json(artwork);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default new ArtworkController();
