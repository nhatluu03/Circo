import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Array of objects with itemId and quantity
    items: [
      {
        type: {
          type: String, // Assuming 'artwork' or 'commission'
          required: true,
          default: "artwork",
          enum: ['artwork', 'commission'],
        },
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'type', // Dynamically reference either 'Artwork' or 'Commission'
        },
        quantity: {
          type: Number,
          default: 1, // Default quantity is 1 if not specified
        },
      },
    ],
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    review: {
      type: String,
    },
    media: [{ type: String, maxlength: 3 }],
    status: {
      type: String, 
      enum: ['pending', 'confirmed', 'in-delivery', 'complete'],
      required: true,
    },
    
    // Delivery information
    recipientName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    streetNo: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
    },
    
    // Packaging information
    packaging: {
      type: String,
      enum: ['1', '2', '3', '4'],
    },
    packingNote: {
      type: String,
      maxLength: [100, "Maximum length of packing note is 100 characters"],
    },

    total: {
      type: Number,
      required: true,
    },
    payment_intent: { 
      type: String, 
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
