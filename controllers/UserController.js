const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize");
const { validateJWT } = require("../middleware");
const { User, Comments, Media } = require("../models");
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

// router.get("/:id", async (req, res) => {
//   try {
//     let user = await User.findByPk(req.params.id);
//     let { id, username, firstName, lastName } = user;

//     res.status(200).json({
//       id,
//       username,
//       firstName,
//       lastName,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error,
//     });
//   }
// });

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        //compare password
        if (bcrypt.compareSync(password, user.password)) {
          //password matches
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          //The token is being created right here, it takes the jwt module and uses the .sign() along with my unique secret to create a unique token for this user. The token is then used to verify authorization and allow access to restricted routes for the user.
          res.status(200).json({
            message: "User successfully logged in",
            token,
            user,
          });
        } else {
          //invalid password
          res.status(401).json({
            error: "Invalid username or password.",
          });
        }
      })
      .catch((err) => {
        //invalid username
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
      isAdmin: false,
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

module.exports = router;
