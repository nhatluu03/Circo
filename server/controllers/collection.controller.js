import mongoose from "mongoose";
import Collection from "../models/collection.model.js";
import { User } from "../models/user.model.js";
import redisHandling from "../utils/redisHandling.js";
import redisResponse from "../utils/redisResponse.js";
class CollectionController {
  isOwner = (collection, userId) => {
    //Check if the talent is the owner of the collection
    return collection.talent.toString() === userId.toString();
  };

  index = async (req, res, next) => {
    const q = req.query
    let isCached = false
    let collections
    const filters = {
      ...(q.talentId && {talent: q.talentId})
    }
    try {
      collections = await redisHandling.getFromRedis(`collections/talentId:${q.talentId}`)
      if(!collections){
        collections = await Collection.find(filters)
        if(!collections){
          throw "API returned an empty array"
        }
        await redisHandling.setToRedis(`collections/talentId:${q.talentId}`, collections)
      }else{
        isCached = true
      }
      redisResponse.sendResponse(res, isCached, collections)
    } catch (error) {
      console.log(error)
      redisResponse.sendErrorResponse(res, "Data unavailable");
    }
  };

  store = async (req, res, next) => {
    const user = await User.findById(req.userId);
    //Client cannot create a collection
    if (user.role !== "talent")
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
        talent: user._id,
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
    // try {
    //   const collection = await Collection.findById(req.params.id);
    //   if (!collection) {
    //     return res.status(404).json({
    //       error: "Not found",
    //     });
    //   }
    //   res.status(500).json(collection);
    // } catch (error) {
    //   next(error);
    // }
    const collectionId = req.params.id
    let isCached = false
    let collection
    try {
      collection = await redisHandling.getFromRedis(`collections/${collectionId}`)
      if(!collection){
        collection = await Collection.findById(collectionId);
        if(!collection){
          throw "API returned an empty data"
        }
        await redisHandling.setToRedis(`collections/${collectionId}`, collection)
      }else{
        isCached = true
      }
      redisResponse.sendResponse(res, isCached, collection)
    } catch (error) {
      console.log(error)
      redisResponse.sendErrorResponse(res, 'Data unavailable')      
    }
  };

  update = async (req, res, next) => {
    const collectionId = req.params.id
    const collection = await Collection.findById(collectionId);
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
      //Redis
      const collectionInRedis = await redisHandling.getFromRedis(`collections/${collectionId}`)
      if(collectionInRedis){
        await redisHandling.setToRedis(`collections/${collectionId}`, updatedCollection)
      }
      // Update the list associated with "artworks/talentId:${q.talentId}"
      const listKey = `collections/talentId:${req.userId}`
      let collections = await redisHandling.getFromRedis(listKey)
      if(Array.isArray(collections)){
        collections = collections.map(collection =>{
          if(collection._id === collectionId){
            return updatedCollection
          }
          return collection
        })
        await redisHandling.setToRedis(listKey, collections)
      }
      res.status(200).json(updatedCollection);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    const collectionId = re.params.id
    const collection = await Collection.findById(collectionId);
    if (!collection)
      return res.status(404).json({
        error: "Not found",
      });
    if (!this.isOwner(collection, req.userId))
      return res.status(401).json({
        error: "You don't have enough permission to delete this collection",
      });
    try {
      await redisHandling.deleteFromRedis(`collections/${collectionId}`)
      //Delete artwork belong to an array in redis
      let collections = await redisHandling.getFromRedis(`collections/talentId:${req.userId}`)
      if(Array.isArray(collections)){
        collections = collections.filter(collection => collection._id !== collectionId)
        await redisHandling.setToRedis(`collections/talentId:${req.userId}`,)
      }
      await Collection.findByIdAndDelete(collectionId);
      res.status(200).json("Deleting a collection");
    } catch (error) {
      next(error);
    }
  };
}

export default new CollectionController();
