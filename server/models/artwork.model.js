import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema(
  {
    talent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String, required: true }],
    likes: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ArtCategory', required: true },
    price: { type: Number, required: function () { return this.forSelling; } }, // Make 'price' required based on 'forSelling'
    forSelling: { type: Boolean, default: false }, // New field to indicate if artwork is for selling
  },
  { timestamps: true }
);

const Artwork = mongoose.model("Artwork", ArtworkSchema);
export default Artwork;
