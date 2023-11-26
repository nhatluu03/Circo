import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cover:{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' },
  title: { type: String, required: true },
  state: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  description: { type: String },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
}, {timestamp: true});

const Collection = mongoose.model('Collection', CollectionSchema);
export default Collection;