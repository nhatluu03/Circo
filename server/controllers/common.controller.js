import mongoose from "mongoose";
import Artwork from "../models/artwork.model.js";
import User from '../models/user.model.js';
import createError from "../utils/createError.js";
class ArtworkController {
  search = async (req, res, next) => {
    const query = req.query.q;
    try {
      // Search in User (Talent) model
      const foundTalents = await User.find({
        $text: { $search: query, $caseSensitive: false },
      });

      // Search in Artwork model
      const foundArtworks = await Artwork.find({ $text: { $search: query } });

      // Combine and return the results
      return {
        talents: foundTalents,
        artworks: foundArtworks,
      };
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default new ArtworkController();
