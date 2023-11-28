import Commission from "../models/commission.model.js";
import "mongoose";

class CommissionController {
  index = async (req, res, next) => {
    res.status(200).json("Getting all commissions");
  };

  store = async (req, res, next) => {
    res.status(200).json("Creating a new commission");
  };

  show = async (req, res, next) => {
    res.status(200).json("Getting a specific commission");
  };

  update = async (req, res, next) => {
    res.status(200).json("Updating a commission");
  };

  destroy = async (req, res, next) => {
    res.status(200).json("Deleting a commission");
  };
}

export default new CommissionController();