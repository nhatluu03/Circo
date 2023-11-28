import Order from "../models/order.model";

class OrderController {
  index = async (req, res, next) => {
    res.status(200).json("Getting all orders");
  };

  store = async (req, res, next) => {
    res.status(200).json("Creating a new order");
  };

  show = async (req, res, next) => {
    res.status(200).json("Getting a specific order");
  };

  update = async (req, res, next) => {
    res.status(200).json("Updating a order");
  };

  destroy = async (req, res, next) => {
    res.status(200).json("Deleting a order");
  };
}

export default new OrderController();
