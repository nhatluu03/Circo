import "mongoose";
import ArtworkCollection from '../models/artworkCollection.model'
import roles from "../roles.js";

class ArtworkCollection {
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

export default new ArtworkCollection();