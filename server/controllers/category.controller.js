import Category from "../models/category.model.js";
import redisHandling from "../utils/redisHandling.js";
import redisResponse from "../utils/redisResponse.js";

class CategoryController {
  index = async (req, res, next) => {
    let isCached = false;
    try {
      let categories = await redisHandling.getFromRedis(`categories`);
      if (!categories) {
        categories = await Category.find();
        if (!categories) {
          throw "API returned an empty array";
        }
        await redisHandling.setToRedis(`categories`, categories);
      } else {
        isCached = true;
      }
      redisResponse.sendResponse(res, isCached, categories);
    } catch (error) {
      console.log(error);
      redisResponse.sendErrorResponse(res, "Data unavailable");
    }
  };

  store = async (req, res, next) => {
    const category = new Category({
      ...req.body,
    });
    await category.save();
    res.status(200).json("Creating a new category");
  };

  show = async (req, res, next) => {
    const categoryId = req.params.id;
    let isCached = false;
    let category;
    try {
      category = await redisHandling.getFromRedis(`categories/${categoryId}`);
      if (!category) {
        category = await Category.findById(categoryId);
        if (!category) {
          throw "API returned an empty data";
        }
        redisHandling.setToRedis(`categories/${categoryId}`, category);
      } else {
        isCached = true;
      }
      redisResponse.sendResponse(res, isCached, category);
    } catch (error) {
      console.log(error);
      redisResponse.sendErrorResponse(res, "Data unavailable");
    }
  };

  update = async (req, res, next) => {
    const categoryId = req.params.id
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { $set: req.body },
        { new: true }
      );
      const categoryInRedis = await redisHandling.getFromRedis(`categories/${categoryId}`)
      if(categoryInRedis){
        await redisHandling.setToRedis(`categories/${categoryId}`, updatedCategory)
      }
      const listKey = 'categories'
      let categories = await redisHandling.getFromRedis(listKey)
      if(Array.isArray(categories)){
        categories = categories.map(category =>{
          if(category._id === categoryId){
            return updatedCategory
          }
          return category
        })
        await redisHandling.setToRedis('categories', categories)
      }
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    const categoryId = req.params.id;
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({
          error: "Category not found",
        });
      }
      //Redis
      const categoryInRedis = await redisHandling.getFromRedis(`categories/${categoryId}`)
      if(categoryInRedis){
        //Delete in Redis if exists
        await redisHandling.deleteFromRedis(`categories/${categoryId}`)
      }
      //Delete category associated an array if exists
      const listKey = 'categories'
      let categories = await redisHandling.getFromRedis(listKey)
      if(Array.isArray(categories)){
        // If the list is in the cache, remove the specific category from the list
        categories = categories.filter(category => category._id !== categoryId)
        // Set the updated list back to Redis cache
        await redisHandling.setToRedis(listKey, categories)
      }
      await Category.findByIdAndDelete(categoryId);
      res.status(200).json("Deleting a category");
    } catch (error) {
      next(error);
    }
  };
}

export default new CategoryController();
