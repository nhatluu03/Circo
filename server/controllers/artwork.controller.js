import Artwork from "../models/artwork.model.js";
import createError from "../utils/createError.js";

class ArtworkController {
  
  isOwner = (artwork, userId) => {
    return artwork.artist.toString() === userId.toString();
  };

  index = async (req, res, next) => {
    res.status(200).json("Getting all artworks");
  };

  store = async (req, res, next) => {
    const artwork = new Artwork({
      ...req.body,
    })
    try {
      const newArtwork = await artwork.save();
      res.status(201).json(newArtwork);

    } catch (error) {
      next(error)
    }
  };

  show = async (req, res, next) => {
    try {
      const artwork = await Artwork.findById(req.params.id);
      if(!artwork)
        return next(createError(404,"NotFound"));
      res.status(200).json(artwork);

    } catch (error) {
      next(error)
    }
  };

  
  update = async (req, res, next) => {
    try {
      const artwork = await Artwork.findById(req.params.id);
      //Check if artwork exists
      if (!artwork) 
        return next(createError(404,"Artwork not found"))

      //Check if the artist is the artwork's owner
      if (!this.isOwner(artwork, req.user._id)) 
        return next(createError(403,"You do not have permission to update this artwork"));
      
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
      //Check if the artist is the artwork's owner
      if (!this.isOwner(artwork, req.user._id)) {
        return next(createError(403,"You do not have permission to delete this artwork"));
      }
  
      await Artwork.findByIdAndDelete(req.params.id);
  
      res.status(200).json("Artwork deleted successfully")
    } catch (error) {
      next(error);
    }
  };
}

export default new ArtworkController();
