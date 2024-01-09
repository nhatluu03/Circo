import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema(
  {
    talent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String, required: true }],
    likes: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    description: { type: String },
    fields: [{type: mongoose.Schema.Types.ObjectId, ref: 'Field'}],
    price: {
      type: Number,
      validate: {
        validator: function () {
          // If forSelling is false, ensure that price is not provided
          return !(this.forSelling === false && this.price !== undefined);
        },
        message: 'Cannot set the price when forSelling is false.',
      },
    },
    title: {
      type: String,
      validate: {
        validator: function () {
          // If forSelling is false, ensure that price is not provided
          return !(this.forSelling === false && this.title !== undefined);
        },
        message: 'Cannot set the title when forSelling is false.',
      },
    },
    forSelling: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

// Indexing for searching
ArtworkSchema.index({ description: 'text' });

const Artwork = mongoose.model("Artwork", ArtworkSchema);
export default Artwork;