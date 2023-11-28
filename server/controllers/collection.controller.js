import mongoose from "mongoose";
import Collection from "../models/collection.model.js";
import roles from "../roles.js";
import { User } from "../models/user.model.js";

class CollectionController {
  isOwner = (collection, userId) => {
    //Check if the artist is the owner of the collection
    return collection.artist.toString() === userId.toString();
  };

  index = async (req, res, next) => {
    try {
      //Create an ObjectId from req.params.id
      const artistId = new mongoose.Types.ObjectId(req.params.id);
      //Query
      const collections = await Collection.find({ artist: artistId });
      res.status(200).json(collections);
    } catch (error) {
      // Handle errors here
      next(error);
    }
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
      const artworkIds = await artworks.map(
        (artworkId) => new mongoose.Types.ObjectId(artworkId)
      );
      // Create a new collection instance using the Collection model
      const collection = new Collection({
        ...collectionData,
        artist: user._id,
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
      if (!collection)
        return res.status(404).json({
          error: "Not found",
        });
      res.status(200).json(collection);
    } catch (error) {
      next(error);
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
      // const updatedCollection = await Collection.findByIdAndUpdate(
      //   req.params.id,
      //   { $set: req.body },
      //   { new: true }
      // );
      // res.status(200).json(updatedCollection);

      // Check if the request body contains artworkToAdd and artworkToRemove
      const { artworkToAdd, artworkToRemove, ...updatedData } = req.body;
      // Add new artwork to the collection
      if (artworkToAdd) {
        const artworkIdToAdd = new mongoose.Types.ObjectId(artworkToAdd);
        collection.artworks.push(artworkIdToAdd);
      }
      // Remove artwork from the collection
      if (artworkToRemove) {
        const artworkIdToRemove = new mongoose.Types.ObjectId(artworkToRemove);
        collection.artworks = collection.artworks.filter(
          (artworkId) => !artworkId.equals(artworkIdToRemove)
        );
      }
      // Update other properties in the collection
      Object.assign(collection, updatedData);
      // Save the updated collection to the database
      const updatedCollection = await collection.save();
      res.status(200).json(updatedCollection);
    } catch (error) {
      next(error);
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
        error: "You don't have enough permission to delete this collection",
      });

    try {
      await Collection.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleting a collection");
    } catch (error) {
      next(error);
    }
  };
}

export default new CollectionController();
