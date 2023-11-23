import Category from "../models/category.model.js";
import createError from "../utils/createError.js";

class CategoryController {
  index = async (req, res, next) => {
    res.status(200).json("Getting all categories");
  };

  store = async (req, res, next) => {
    const category = new Category({
      ...req.body,
    });
    await category.save();
    res.status(200).json("Creating a new category");
  };

  show = async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    res.status(200).json("Getting a specific category");
  };

  update = async (req, res, next) => {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("Updating a category");
  };

  destroy = async (req, res, next) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleting a category");
    } catch (error) {
      next(error)
    }
  };
}

export default new CategoryController();
