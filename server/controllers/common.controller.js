import mongoose from "mongoose";
import Artwork from "../models/artwork.model.js";
import { User } from "../models/user.model.js";
import createError from "../utils/createError.js";
class CommonController {
  search = async (req, res, next) => {
    const query = req.query.query;
    // res.status(200).json(query);
    try {
      const searchTerms = query.split(/\s+/);

      // Create a regular expression for each term
      const regexTerms = searchTerms.map((term) => new RegExp(term, "i"));

      // Use $or to match any of the terms in fullname, username, or bio
      const foundTalents = await User.find({
        $or: [
          { fullname: { $in: regexTerms } },
          { username: { $in: regexTerms } },
          { bio: { $in: regexTerms } },
        ],
      });

      // Search in Artwork model
      const foundArtworks = await Artwork.find({
        $or: [
          { title: { $in: regexTerms } },
          { description: { $in: regexTerms } },
        ],
      });
      // const foundArtworks = await Artwork.find({ $text: { $search: query } });

      // Combine and return the results
      // return {
      //   talents: foundTalents,
      //   // artworks: foundArtworks,
      // };
      res.json({talents: foundTalents, artworks: foundArtworks});
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default new CommonController();
