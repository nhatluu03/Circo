import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FieldSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: [100, "Name of a creative field cannot exceed 50 characters"]},
    jobTitles: [{type: String, required: true, maxLength: [100, "Job title of a creative field cannot exceed 100 characters"]}],
    description: {type: String},
    image: {type: String, required: true},
  },
  { timestamps: true }
);

const Field = mongoose.model("Field", FieldSchema);

export default Field;