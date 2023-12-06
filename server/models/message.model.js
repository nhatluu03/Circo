import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;