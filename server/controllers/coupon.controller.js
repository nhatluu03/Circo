import Coupon from "../models/coupon.model.js";
import "mongoose";

class CouponController {
  index = async (req, res, next) => {
    res.status(200).json("Getting all coupons");
  };

  store = async (req, res, next) => {
    res.status(200).json("Creating a new coupon");
  };

  show = async (req, res, next) => {
    res.status(200).json("Getting a specific coupon");
  };

  update = async (req, res, next) => {
    res.status(200).json("Updating a coupon");
  };

  destroy = async (req, res, next) => {
    res.status(200).json("Deleting a coupon");
  };
}

export default new CouponController();