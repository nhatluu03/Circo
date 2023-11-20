import Category from "../models/category.model.js";

class CategoryController {
  index = async (req, res, next) => {
    res.status(200).json("Getting all categories");
  };

  store = async (req, res, next) => {
    res.status(200).json("Creating a new category");
  };

  show = async (req, res, next) => {
    res.status(200).json("Getting a specific category");
  };

  update = async (req, res, next) => {
    res.status(200).json("Updating a category");
  };

  destroy = async (req, res, next) => {
    res.status(200).json("Deleting a category");
  };
}

export default new CategoryController();
