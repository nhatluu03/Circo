import Conversation from "../models/conversation.model.js";
import "mongoose";

class ConversationController {
  index = async (req, res, next) => {
    const conversations = await Conversation.find();
    res.status(200).json(conversations);
  };

  store = async (req, res, next) => {
    const conversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const savedConversation = await conversation.save();
      res.status(200).json(savedConversation);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const conversation = await Conversation.findById(req.params.id);
      if (!conversation)
        return res.status(404).json({
          error: "Conversation not found",
        });
      res.status(200).json(conversation);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const conversation = await Conversation.findById(req.params.id);
      if (!conversation)
        return res.status(404).json({
          error: "Conversation not found",
        });
      const updatedConversation = await Conversation.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedConversation);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const conversation = await Conversation.findById(req.params.id);
      if (!conversation)
        return res.status(404).json({
          error: "Conversation not found",
        });
      await Conversation.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleting a conversation");
    } catch (error) {
      next(error);
    }
  };
}

export default new ConversationController();
