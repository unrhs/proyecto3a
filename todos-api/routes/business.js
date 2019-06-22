const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const authUtils = require("../helpers/auth");
const uploader = require("../helpers/multer");

//Crear hacer un get para llamar todos business.find,

// find business

router.get("/", authUtils.verifyToken, (req, res) => {
  const { _id } = req.user;
  Business.find({ author: _id })
    .then(business => {
      res.status(200).json({ business });
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: "Error al buscar los negocios"
      });
    });
});

//get all business

router.get("/getAll", (req, res, next) => {
  Business.find()
    .them(business => res.status(200).json({ business }))
    .catch(error => {
      error.action = "error buscando la categoría";
      next(error);
    });
});

// get business
router.get("/:id", authUtils.verifyToken, (req, res) => {
  const { id } = req.params;

  Business.findById(id)
    .then(business => {
      res.status(200).json({ business });
    })
    .catch(error => {
      res.status(404).json({
        error,
        message: "Error al buscar el negocio"
      });
    });
});

// create business
router.post(
  "/add",
  authUtils.verifyToken,
  uploader.array("images"),
  (req, res) => {
    const { _id: author } = req.user;

    const images = req.files.map(file => file.secure_url);

    Business.create({ ...req.body, author, images })
      .then(business => {
        res.status(201).json({ business });
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: "No se puedo crear el negocio"
        });
      });
  }
);

// update Business
router.patch("/:id", authUtils.verifyToken, (req, res) => {
  const { id } = req.params;
  const { _id: author } = req.user;

  Business.findOneAndUpdate(
    { _id: id, author },
    { $set: req.body },
    { new: true }
  )
    .then(business => {
      res.status(200).json({ business });
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: "No puedes editar porque seguro no es tu negocio, lo lamento."
      });
    });
});

// delete todo
router.delete("/:id", authUtils.verifyToken, (req, res) => {
  const { id } = req.params;
  const { _id: author } = req.user;

  Business.findOneAndRemove({ _id: id, author })
    .then(business => {
      res.status(200).json({ business });
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: "Error al eliminar el negocio"
      });
    });
});

module.exports = router;
