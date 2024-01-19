import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Material = new Schema(
  {
    name: {type: String, required: true, maxLength: [100, "Name of the material cannot exceed 50 characters"]},
    description: {type: String},
  },
  { timestamps: true }
);

const Field = mongoose.model("Material", Material);

export default Field;