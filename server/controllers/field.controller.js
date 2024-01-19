import Field from "../models/field.model.js";

class FieldController {
  index = async (req, res, next) => {
    const fields = await Field.find()
    res.status(200).json(fields);
  };

  store = async (req, res, next) => {
    const field = new Field({
      ...req.body,
    });
    await field.save();
    res.status(200).json(field);
  };

  show = async (req, res, next) => {
    try {
      const field = await Field.findById(req.params.id);
      if (!field) {
        return res.status(404).json({
          error: "Creative field not found",
        });
      }
      res.status(200).json(field);
    } catch (error) {
      next(error)      
    }
  };

  update = async (req, res, next) => {
    const field = await Field.findById(req.params.id);
    if (!field) {
      return res.status(404).json({
        error: "Creative field not found",
      });
    }
    try {
      const updatedField = await Field.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedField);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    const field = await Field.findById(req.params.id);
    if (!field) {
      return res.status(404).json({
        error: "Creative field not found",
      });
    }
    try {
      await Field.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleting a field");
    } catch (error) {
      next(error);
    }
  };
}

export default new FieldController();
