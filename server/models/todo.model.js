import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String, required: true },
});

const Todo = mongoose.model("Artwork", TodoSchema);
export default Todo;
