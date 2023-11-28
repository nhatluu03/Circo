import mongoose from "mongoose";
import Order from "../models/order.model";

class OrderController {
  index = async (req, res, next) => {
    try {
      //Create an ObjectId from req.params.id
      const clientId = new mongoose.Types.ObjectId(req.params.id);
      //Query
      const orders = await Order.find({ client: clientId });
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  store = async (req, res, next) => {
    try {
      const order = new Order({
        ...req.body,
      });
      //Save the order to the database
      await order.save();
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    //Check if the order exists
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({
        error: "Order not found",
      });

    try {
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    //Check if the order exists
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({
        error: "Order not found",
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
