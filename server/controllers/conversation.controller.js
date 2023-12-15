import Conversation from "../models/conversation.model.js";
import "mongoose";
import redisHandling from "../utils/redisHandling.js";
import redisResponse from "../utils/redisResponse.js";

class ConversationController {
  // index = async (req, res, next) => {
  //   const conversations = await Conversation.find();
  //   res.status(200).json(conversations);
  // };

  store = async (req, res, next) => {
    const conversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const savedConversation = await conversation.save();
      //Redis
      let conversationsInRedis = await redisHandling.getFromRedis(`conversation/${req.userId}`)
      if(Array.isArray(conversationsInRedis)){
        conversationsInRedis = conversationsInRedis.push(savedConversation)
      }
      res.status(200).json(savedConversation);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const userId = req.params.id
      let isCached = false
      let conversations = await redisHandling.getFromRedis(`conversation/${userId}`)
      if(!conversations){
        conversations = await Conversation.find({
          members: { $in: [req.params.id] },
        });
        if(!conversations){
          throw "Conversations not found"
        }
        await redisHandling.setToRedis(`conversation/${userId}`, conversations)
      }else{
        isCached = true
      }
      redisResponse.sendResponse(res, isCached, conversations)
    } catch (error) {
      console.log(error)
      redisResponse.sendErrorResponse(res, "Data unavailable")
    }
  };

  //   update = async (req, res, next) => {
  //     try {
  //       const conversation = await Conversation.findById(req.params.id);
  //       if (!conversation)
  //         return res.status(404).json({
  //           error: "Conversation not found",
  //         });
  //       const updatedConversation = await Conversation.findByIdAndUpdate(
  //         req.params.id,
  //         {
  //           $set: req.body,
  //         },
  //         { new: true }
  //       );
  //       res.status(200).json(updatedConversation);
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  destroy = async (req, res, next) => {
    try {
      const conversationId = req.params.id
      const conversation = await Conversation.findById(conversationId);
      if (!conversation)
        return res.status(404).json({
          error: "Conversation not found",
        });
      //Redis
      const listKey = `conversation/${req.userId}`
      let conversationsInRedis = await redisHandling.getFromRedis(listKey)
      if(Array.isArray(conversationsInRedis)){
        conversationsInRedis = conversationsInRedis.filter(conversation => conversation._id !== conversationId)
        await redisHandling.setToRedis(listKey, conversationsInRedis)
      }
      await Conversation.findByIdAndDelete(conversationId);
      res.status(200).json("Deleting a conversation");
    } catch (error) {
      next(error);
    }
  };
}

export default new ConversationController();
