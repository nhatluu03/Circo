// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const ArtworkSchema = new Schema(
//   {
//     talent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     images: [{ type: String, required: true }],
//     likes: { type: Number, default: 0 },
//     saves: { type: Number, default: 0 },
//     description: { type: String },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: 'ArtCategory', required: true },
//     price: { type: Number, required: function () { return this.forSelling; } }, // Make 'price' required based on 'forSelling'
//     forSelling: { type: Boolean, required: true}, // New field to indicate if artwork is for selling
//   },
//   { timestamps: true }
// );

// const Artwork = mongoose.model("Artwork", ArtworkSchema);
// export default Artwork;
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
    forSelling: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Artwork = mongoose.model("Artwork", ArtworkSchema);
export default Artwork;



