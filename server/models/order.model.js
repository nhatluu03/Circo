import mongoose, { Types } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    talent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      // Modify the 'type' field to dynamically reference either Artwork or Commission model
      artwork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artwork",
      },
      commission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commission",
      },
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
      default: false,
      required: true,
    },
    payment_intent: { 
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
