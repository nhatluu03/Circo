import mongoose from "mongoose";
import Artwork from "../models/artwork.model.js";
import { TalentUser } from "../models/user.model.js";
import createError from "../utils/createError.js";
import Category from "../models/category.model.js";

class ArtworkController {
  isOwner = (artwork, userId) => {
    return artwork.talent.toString() === userId.toString();
  };

  index = async (req, res, next) => {
    try {
      const artworks = Artwork.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "artist",
            foreignField: "_id",
            pipeline: [{ $match: { _id: "$artist" } }],
            as: "artist"
          }
        },
        { $unwind: "$artist" },
        {
          $project: {
            _id: 1,
            images: 1,
            likes: 1,
            saves: 1,
            description: 1,
            price: 1,
            forSelling: 1,
            artistName: "$artist.name",
            artistAvatar: "$artist.avatar",
          },
        },
      ]).exec();

      res.status(200).json(artworks);
    } catch (error) {
      next(error);
    }
  };

  store = async (req, res, next) => {
    const { user } = req;
    if (user.role === "client")
      return res.status(400).json({
        error: "You don't have enough permission to create artwork",
      });
    const { talent, categoryId, ...artworkData } = req.body; // Destructure talent, category from req.body
    const category = Category.findById(categoryId);
    const artwork = new Artwork({
      talent: user._id, // Convert talent to ObjectId
      category,
      ...artworkData,
    });

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
}

export default new ArtworkController();
