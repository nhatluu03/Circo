import mongoose from "mongoose";

const CommissionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: [100, "Title of the commission cannot exceed 100 characters"]},
    talent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fields: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
      required: true,
    }],
    materials: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    }],
    price: {
      type: Number,
    },
    images: [{ type: String }],
    count: {
      type: Number,
      required: true,
      default: 1,
    },
    priceFrom: {
      type: Number,
      required: true,
      default: 0,
    },
    priceTo: {
      type: Number,
      required: true,
      default: 0,
    },
    note: { type: String },
  },
  { timestamps: true }
);

const Commission = mongoose.model("Commission", CommissionSchema);
export default Commission;
