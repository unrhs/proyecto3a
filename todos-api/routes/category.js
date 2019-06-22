const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const authUtils = require("../helpers/auth");
const uploader = require("../helpers/multer");

//post to create category by  Dylan

router.post("/add", (req, res, next) => {
  Category.create({ ...req.body })
    .then(category => res.status(200).json({ category }))
    .catch(error => {
      error.action = "error creando la categoría, intenta de nuevo";
      next(error);
    });
});

//get all categoriess

router.get("/", (req, res, next) => {
  Category.find()
    .them(category => res.status(200).json({ category }))
    .catch(error => {
      error.action = "error buscando la categoría";
      next(error);
    });
});

//edit catagory

router.patch("/:id/edit", (req, res, next) => {
  let { id } = req.params;
  let catagory = req.body;

  Category.findByIdAndUpdate(
    { _id: id },
    { $set: { ...catagory } },
    { new: true }
  )
    .them(category => res.status(200).json({ category }))
    .catch(error => {
      error.action = "error al editar categoría";
      next(error);
    });
});

module.exports = router;
