const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

router.post("/register", (req, res, next) => {
  let { password, passwordConfirm } = req.body;

  if (password !== passwordConfirm)
    return res.status(500).json({
      error,
      message: "Las contraseñas no coinciden"
    });

  const salt = bcrypt.genSaltSync(10);
  const hasshedPassword = bcrypt.hashSync(req.body.password, salt);
  User.create({ ...req.body, password: hasshedPassword })
    .then(user => {
      jwt.sign(
        { id: user._id },
        process.env.SECRET,
        {
          expiresIn: 86400
        },
        (err, token) => {
          // if (err) throw err;
          // delete user._doc.password;
          res.status(200).json({ token });
        }
      );
    })
    .catch(error => {
      // res.status(500).json({
      //   error,
      //   message: "No se pudo crear el usuario"
      // });
      error.action = "No se pudo crear el usuario";
      next(error);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({
        error: {},
        message: "Email incorrecto"
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        error: {},
        message: "Contraseña incorrecta"
      });
    }

    jwt.sign(
      { id: user._id },
      process.env.SECRET,
      {
        expiresIn: 86400
      },
      (err, token) => {
        // if (err) throw err;
        delete user._doc.password;
        res.status(200).json({ token, user });
      }
    );
  });
});

module.exports = router;
