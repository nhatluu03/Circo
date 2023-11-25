import "mongoose";
import Collection from "../models/collection.model.js";
import roles from "../roles.js";
import { User } from "../models/user.model.js";

class CollectionController {
  isOwner = (collection, userId) => {
    //Check if the artist is the owner of the collection
    return collection.artist.toString() === userId.toString();
  };

  index = async (req, res, next) => {
    res.status(200).json("Getting all collections");
  };

  store = async (req, res, next) => {
    const user = await User.findById(req.userId);
    //Client cannot create a collection
    if (user.role !== "artist")
      return res.status(401).json({
        error: "You don't have enough permission to perform this action",
      });

    try {
      const { artworks, ...collectionData } = req.body; //Destructuring artworks from req.body
      const artworkIds = await artworks.map((artworkId) =>
        mongoose.Types.ObjectId(artworkId)
      );
      // Create a new collection instance using the Collection model
      const collection = new Collection({
        ...collectionData,
        artworks: artworkIds,
      });

      // Save the collection to the database
      await collection.save();

      res.status(200).json("New collection created successfully");
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {

    try {
      const collection = await Collection.findById(req.params.id);
      if(!collection)
        return res.status(404).json({
          error: "Not found",
        });
      res.status(200).json(collection);
    } catch (error) {
      next(error)      
    }
  };

  update = async (req, res, next) => {
    const collection = await Collection.findById(req.params.id);
    if (!collection)
      return res.status(404).json({
        error: "Not found",
      });
    if (!this.isOwner(collection, req.userId))
      return res.status(401).json({
        error: "You don't have enough permission to update this collection",
      });
    try {
      await Collection.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json("Updating a collection");
    } catch (error) {
      next(error)      
    }
  };

  destroy = async (req, res, next) => {
    
    const collection = await Collection.findById(req.params.id);
    if (!collection)
      return res.status(404).json({
        error: "Not found",
      });
    if (!this.isOwner(collection, req.userId))
      return res.status(401).json({
        error: "You don't have enough permission to update this collection",
      });
    
    try {
      await Collection.findByIdAndDelete(req.params.id)
      res.status(200).json("Deleting a collection");
    } catch (error) {
      next(error)      
    }
  };
}

export default new CollectionController();
