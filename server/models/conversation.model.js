import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;