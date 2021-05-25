const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize");
const { validateJWT } = require("../middleware");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/practice", (req, res) => {
  res.send("Hey!! This is a practice route!!");
});

router.get("/", validateJWT, (req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      username: req.user.username,
      isAdmin: req.user.isAdmin,
    },
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          res.status(200).json({
            message: "User successfully logged in",
            token,
            user,
          });
        } else {
          res.status(401).json({
            error: "Invalid username or password.",
          });
        }
      })
      .catch((err) => {
        res.status(401).json({
          error: "Invalid username or password.",
        });
      });
  } catch (error) {
    res.status(500).json({ error });
  }

  try {
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/register", (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  console.log(req.body);
  try {
    User.create({
      username,
      password: bcrypt.hashSync(password, 10),
      email,
      firstName,
      lastName,
      isAdmin: true,
    })
      .then((user) => {
        console.log(user);
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        res.status(201).json({
          message: "User successfully created.",
          token,
          user,
        });
      })
      .catch((err) => {
        if (typeof err === UniqueConstraintError) {
          res.status(401).json({
            message: "That email or username already exists.",
          });
        }
        res.status(401).json({ message: "Something went wrong." });
      });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error });
  }
});

router.delete("/admin", async (req, res) => {
  const { id } = req.body;
  try {
    const query = {
      where: {
        id: id,
      },
    };
    await User.destroy(query);
    res.status(200).json({ message: "User removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed Task" });
  }
});

module.exports = router;
