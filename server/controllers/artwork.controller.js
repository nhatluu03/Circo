import mongoose from "mongoose";
import Artwork from "../models/artwork.model.js";
import createError from "../utils/createError.js";
import Category from "../models/category.model.js";
import client from ".././redisSetup.js";
import responseView from "../utils/redisResponse.js";
import getOrSetCache from "../utils/getOrSetCache.js";

class ArtworkController {
  isOwner = (artwork, userId) => {
    return artwork.talent.toString() === userId.toString();
  };

  index = async (req, res, next) => {
    const q = req.query;
    let isCached = false;
    let artworks
    const filters = {
      ...(q.talentId && { talent: q.talentId }),
    };
    try {
      const cacheResult = await client.get(q.talentId)
      if(cacheResult){
        isCached = true;
        artworks = JSON.parse(cacheResult)
      }else{
        artworks = await Artwork.find(filters);
        if(!artworks){
          throw "API returned an empty array";
        }
        await client.set(q.talentId, JSON.stringify(artworks))
      }
      responseView.sendResponse(res, isCached, artworks);
    } catch (error) {
      console.error(error);
      responseView.sendErrorResponse(res, "Data unavailable");
    }
  };

  show = async (req, res, next) => {
    const artworkId = req.params.id;
    let artwork;
    let isCached = false;
    try {
      const cacheResult = await client.get(artworkId);
      if (cacheResult) {
        isCached = true;
        artwork = JSON.parse(cacheResult);
      } else {
        artwork = await Artwork.findById(artworkId);
        if (!artwork) {
          throw "API returned an empty data";
        }
        await client.set(artworkId, JSON.stringify(artwork));
      }

      responseView.sendResponse(res, isCached, artwork);
    } catch (error) {
      console.error(error);
      responseView.sendErrorResponse(res, "Data unavailable");
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
