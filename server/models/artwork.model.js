import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema(
  {
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String, required: true }],
    likes: {type: Number, default: 0},
    saves: {type: Number, default: 0},
    description: {type: String},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ArtCategory', required: true },
  },
  { timestamps: true }
);

const Artwork = mongoose.model("Artwork", ArtworkSchema);
export default Artwork;