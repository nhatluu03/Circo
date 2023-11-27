import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({

    artist:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    category:{
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'ArtCategory', required: true},
    },
    price_from:{
        type: Number
    },
    price_to:{
        type: Number,
    },
    images: [{ type: String }],
    count:{
        type: Number,
        required: true,
    },
    note:{ type: String } 
});

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
