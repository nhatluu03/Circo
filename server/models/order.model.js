import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  type:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  rating:{
    type: Number,
    enum:[1,2,3,4,5]
  },
  review:{
    type: String,
  },
  media: [{ type: String, maxlength: 3 }]
  
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
