import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
}, {timestamp: true});

const Collection = mongoose.model('Collection', CollectionSchema);
export default Collection;