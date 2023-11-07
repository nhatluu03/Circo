import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArtCategoryFieldSchema = new Schema(
  {
    title: {type: String, required: true, maxLength: [100, "Field name cannot exceed 50 characters"]},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ArtCategory', required: true },
  },
  { timpestamps: true }
);

const ArtCategoryField = mongoose.model("ArtCategoryField", ArtCategoryFieldSchema);
export default ArtCategoryField;