const express = require("express");
const router = express.Router();
const SubCategory = require("../models/SubCategory");
const authUtils = require("../helpers/auth");
const uploader = require("../helpers/multer");

//post to create category by  Dylan

router.post("/add", (req, res, next) => {
  SubCategory.create({ ...req.body })
    .then(subCategory => res.status(200).json({ subCategory }))
    .catch(error => {
      error.action = "error creating subcategory";
      next(error);
    });
});

//get all categorys

router.get("/", (req, res, next) => {
  SubCategory.find()
    .them(subCategory => res.status(200).json({ subCategory }))
    .catch(error => {
      error.action = "error finding subcategory";
      next(error);
    });
});

//edit catagory

router.patch("/:id/edit", (req, res, next) => {
  let { id } = req.params;
  let catagory = req.body;

  SubCategory.findByIdAndUpdate(
    { _id: id },
    { $set: { ...catagory } },
    { new: true }
  )
    .them(subCategory => res.status(200).json({ subCategory }))
    .catch(error => {
      error.action = "error editing subcategory";
      next(error);
    });
});

module.exports = router;
