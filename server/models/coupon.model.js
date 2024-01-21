import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      minLength: [5, "Coupon code must have at least 5 characters"],
      maxLength: [10, "Coupon code cannot exceed 5 characters"],
    },
    type: {
      type: String,
      enum: ["percentage", "amount"],
      required: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    expiry_date: {
      type: Date,
    },
    count: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
