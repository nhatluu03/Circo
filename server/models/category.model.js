import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    title: {type: String, required: true, maxLength: [100, "Category title cannot exceed 50 characters"]},
    description: {type: String}
  },
  { timpestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;