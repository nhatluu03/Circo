import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100},
  description: { type: String },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
}, {timestamp: true});

const Event = mongoose.model('Event', EventSchema);
export default Event;