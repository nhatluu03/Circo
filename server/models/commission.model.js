import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema(
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
    price_from: {
      type: Number,
    },
    price_to: {
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

const Commission = mongoose.model("Commission", commissionSchema);
export default Commission;
