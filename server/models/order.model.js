import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    review: {
      type: String,
    },
    media: [{ type: String, maxlength: 3 }],
    isCompleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
