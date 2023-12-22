import Commission from "../models/commission.model.js";
import "mongoose";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

class CommissionController {
  index = async (req, res, next) => {
    const commissions = await Commission.find();
    res.status(200).json(commissions);
  };

  store = async (req, res, next) => {
    //Find the currentUser to get "_id" and check "permission"
    const currentUser = await User.findById(req.userId);
    if (currentUser.role !== "talent")
      return res.status(401).json({
        error: "Only talent can create commission",
      });
    //Destructuring category String from req.body
    const { category } = req.body;
    //Convert to Object dataType
    const categoryId = new mongoose.Types.ObjectId(category);

    const commission = new Commission({
      talent: currentUser._id,
      category: categoryId,
      ...req.body,
    });
    try {
      await commission.save();
      res.status(200).json(commission);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    const commission = await Commission.findById(req.params.id);
    if (!commission)
      return res.status(404).json({
        error: "Commission not found",
      });
    try {
      res.status(200).json(commission);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const commission = await Commission.findById(req.params.id);
      const talent = await User.findById(req.userId);
      if (!commission)
        return res.status(404).json({
          error: "Commission not found",
        });
      if (commission.talent.toString() !== talent._id.toString())
        return res.status(401).json({
          error: "You do not have enough permission to perform this action",
        });
      const updatedCommission = await Commission.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCommission);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    const commission = await Commission.findById(req.params.id);
    const talent = await User.findById(req.userId);
    if (!commission)
      return res.status(404).json({
        error: "Commission not found",
      });
    if (commission.talent.toString() !== talent._id.toString())
      return res.status(401).json({
        error: "You do not have enough permission to perform this action",
      });
    try {
      await Commission.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleting a commission");
    } catch (error) {
      next(error);
    }
  };
}

export default new CommissionController();
