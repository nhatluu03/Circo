import mongoose from "mongoose";
import Order from "../models/order.model.js";
import { User } from "../models/user.model.js";

class OrderController {
  index = async (req, res, next) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  store = async (req, res, next) => {
    try {
      const artist = await User.findById(req.params.id)
      const client = await User.findById(req.userId);
      let orderData = {
        artist: artist._id,
        client: client._id,
        ...req.body,
      };
      if (req.body.type && req.body.type.artwork) {
        orderData.type = {
          artwork: new mongoose.Types.ObjectId(req.body.type.artwork),
        };
      } else if (req.body.type && req.body.type.commission) {
        orderData.type = {
          commission: new mongoose.Types.ObjectId(req.body.type.commission),
        };
      } else {
        return res.status(404).json({
          error: "Type filed is invalid",
        });
      }
      const order = new Order(orderData)
      //Save the order to the database
      await order.save()
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    //Check if the order exists
    console.log(req.params.id);
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }
    res.status(200).json(order);
  };

  update = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    const user = await User.findById(req.userId);
    //Check if the order exists
    if (!order)
      return res.status(404).json({
        error: "Order not found",
      });
    //Check if the client is the owner of the order
    if (order.client.toString() !== user._id.toString())
      return res.status(404).json({
        error: "You do not have permission to update this order",
      });

    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    //Check if the order exists
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({
        error: "Order not found",
      });

    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleting an order");
    } catch (error) {
      next(error);
    }
  };
}

export default new OrderController();
