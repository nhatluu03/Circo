import Message from "../models/message.model.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import redisHandling from "../utils/redisHandling.js";
import redisResponse from "../utils/redisResponse.js";

class MessageController {
  // index = async (req, res, next) => {
  //   try {
  //     const messages = await Message.find({ conversationId: req.params.id });
  //     res.status(200).json(messages);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  store = async (req, res, next) => {
    const message = new Message(req.body);
    try {
      const savedMessage = await message.save();
      //Redis
      let messagesInRedis = await redisHandling.getFromRedis(`messages/${id}`)
      if(Array.isArray(!messagesInRedis)){
        messagesInRedis = messagesInRedis.push(savedMessage)
        redisHandling.setToRedis(`messages/${id}`, messagesInRedis)
      }
      res.status(200).json(savedMessage);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Check if id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid conversationId" });
      }
      let isCached = false
      let messages = await redisHandling.getFromRedis(`messages/${id}`)
      if(!messages){
        messages = await Message.find({ conversationId: id });
        if(!messages){
          throw "API returned an empty array"
        }
        await redisHandling.setToRedis(`messages/${id}`, messages)
      }else{
        isCached = true
      }
      redisResponse(res, isCached, messages)
    } catch (error) {
      console.log(error)
      redisResponse.sendErrorResponse(res, 'Data unavailable')
    }
  };
  
  

  update = async (req, res, next) => {};

  destroy = async (req, res, next) => {};
}

export default new MessageController();
