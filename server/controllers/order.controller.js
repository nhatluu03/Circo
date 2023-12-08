import mongoose from "mongoose";
import Order from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Stripe from "stripe";
import Artwork from "../models/artwork.model.js";
import Commission from "../models/commission.model.js";

class OrderController {
  intent = async (req, res, next) => {
    //Find the artwork/commission, client in the database
    const commission = await Commission.findById(req.params.id);
    const artwork = await Artwork.findById(req.params.id);
    const client = await User.findById(req.userId);

    //Stripe Integration
    const stripe = new Stripe(process.env.STRIPE);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "aud",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    //Define the orderData
    let orderData = {
      client: client._id,
      payment_intent: paymentIntent.id,
      ...req.body,
    };
    //Check whether the type is artwork or commission
    if (artwork) {
      //Add fields
      orderData.type = {
        artwork: new mongoose.Types.ObjectId(req.params.id),
      };
      orderData.price = artwork.price;
      orderData.talent = artwork.talent;
      //Stripe Integration
      paymentIntent.amount = artwork.price * 100;
    } else if (commission) {
      //Add fields
      orderData.type = {
        commission: new mongoose.Types.ObjectId(req.params.id),
      };
      orderData.price = commission.price;
      orderData.talent = commission.talent;
      //Stripe Integration
      paymentIntent.amount = commission.price * 100;
    } else {
      res.status(404).json({
        error: "Invalid type",
      });
    }

    const order = new Order(orderData);
    await order.save();
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  };

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
      //Find the artwork/commission, client in the database
      const commission = await Commission.findById(req.params.id);
      const artwork = await Artwork.findById(req.params.id);
      const client = await User.findById(req.userId);
      //Define the orderData
      let orderData = {
        client: client._id,
        ...req.body,
      };
      //Check whether the type is artwork or commission
      if (artwork) {
        orderData.type = {
          artwork: new mongoose.Types.ObjectId(req.params.id),
        };
        orderData.price = artwork.price;
        orderData.talent = artwork.talent;
      } else if (commission) {
        orderData.type = {
          commission: new mongoose.Types.ObjectId(req.params.id),
        };
        orderData.price = commission.price;
        orderData.talent = commission.talent;
      } else {
        res.status(404).json({
          error: "Invalid type",
        });
      }
      const order = new Order(orderData);
      //Save the order to the database
      await order.save();
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
