import Material from "../models/material.model.js";

class MaterialController {
  index = async (req, res, next) => {
    const materials = await Material.find()
    res.status(200).json(materials);
  };

  store = async (req, res, next) => {
    const material = new Material({
      ...req.body,
    });
    await material.save();
    res.status(200).json(material);
  };

  show = async (req, res, next) => {
    try {
      const material = await Material.findById(req.params.id);
      if (!material) {
        return res.status(404).json({
          error: "Creative material not found",
        });
      }
      res.status(200).json(material);
    } catch (error) {
      next(error)      
    }
  };

  update = async (req, res, next) => {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({
        error: "Creative material not found",
      });
    }
    try {
      const updatedMaterial = await Material.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedMaterial);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({
        error: "Creative material not found",
      });
    }
    try {
      await Material.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleting a material");
    } catch (error) {
      next(error);
    }
  };
}

export default new MaterialController();
