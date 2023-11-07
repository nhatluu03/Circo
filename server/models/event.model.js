const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
}, {timestamp: true});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
