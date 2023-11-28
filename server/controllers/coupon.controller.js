import Coupon from "../models/coupon.model.js";
import "mongoose";

class CouponController {
  index = async (req, res, next) => {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  };

  store = async (req, res, next) => {
    try {
      const coupon = new Coupon({
        ...req.body,
      });
      await coupon.save();
      res.status(200).json(coupon);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const coupon = await Coupon.findById(req.params.id);
      if (!coupon)
        return res.status(404).json({
          error: "Coupon not found",
        });
      res.status(200).json(coupon);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const coupon = await Coupon.findById(req.params.id);
      //Check if the coupon exists
      if (!coupon)
        return res.status(404).json({
          error: "Coupon not found",
        });
      //Update coupon
      const updatedCoupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedCoupon);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const coupon = await Coupon.findById(req.params.id);
      if (!coupon)
        return res.status(404).json({
          error: "Coupon not found",
        });
      await Coupon.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleting a coupon");
    } catch (error) {
      next(error);
    }
  };
}

export default new CouponController();
