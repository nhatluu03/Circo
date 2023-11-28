import Category from "../models/category.model.js";

class CategoryController {
  index = async (req, res, next) => {
    const categories = await Category.find()
    res.status(200).json(categories);
  };

  store = async (req, res, next) => {
    const category = new Category({
      ...req.body,
    });
    await category.save();
    res.status(200).json("Creating a new category");
  };

  show = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({
          error: "Category not found",
        });
      }
      res.status(200).json(category);
    } catch (error) {
      next(error)      
    }
  };

  update = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleting a category");
    } catch (error) {
      next(error);
    }
  };
}

export default new CategoryController();
