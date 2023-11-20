import Artwork from "../models/artwork.model.js";
import "mongoose";
import roles from "../roles.js";
import "mongoose";
import "../utils/loadEnv.js";

class ArtworkController {
  index = async (req, res, next) => {
    res.status(200).json("Getting all artworks");
  };

  store = async (req, res, next) => {
    res.status(200).json("Creating a new artwork");
  };

  show = async (req, res, next) => {
    res.status(200).json("Getting a specific artwork");
  };

  update = async (req, res, next) => {
    res.status(200).json("Updating a artwork");
  };

  destroy = async (req, res, next) => {
    res.status(200).json("Deleting a artwork");
  };
}

export default new ArtworkController();
