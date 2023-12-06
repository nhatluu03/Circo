import Message from "../models/message.model.js";
import "mongoose";

class MessageController {
  index = async (req, res, next) => {
    try {
      const messages = await Message.find({ conversationId: req.params.id });
      res.status(200).json(messages)
    } catch (error) {
      next(error);
    }
  };

  store = async (req, res, next) => {
    const message = new Message(req.body);
    try {
      const savedMessage = await message.save();
      res.status(200).json(savedMessage);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {};

  update = async (req, res, next) => {};

  destroy = async (req, res, next) => {};
}

export default new MessageController();
