import mongoose from "mongoose";

const CommissionSchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ArtCategory",
      required: true,
    },
    price: {
      type: Number,
    },
    images: [{ type: String }],
    count: {
      type: Number,
      required: true,
      default: 1,
    },
    note: { type: String },
  },
  { timestamps: true }
);

const Commission = mongoose.model("Commission", CommissionSchema);
export default Commission;
