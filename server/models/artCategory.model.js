import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArtCategorySchema = new Schema(
  {
    title: {type: String, required: true, maxLength: [100, "Category title cannot exceed 50 characters"]},
    description: {type: String}
  },
  { timpestamps: true }
);

const ArtCategory = mongoose.model("ArtCategory", ArtCategorySchema);

export default ArtCategory;