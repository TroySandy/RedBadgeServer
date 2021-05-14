const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize");
const { validateJWT } = require("../middleware");
const { User, Media, Comments } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/users", async (req, res) => {
    // res.send("Hey!! This is a practice route!!");
    try {
      const allUsers = await User.findAll({
        include: [{
          model: Media,
          include: [{
            model: Comments
          }]
        }]
      }).then((allUser) => {
        res.status(200).json({ User: allUser });
      });
    } catch (err) {
      res.status(500).json({ error: `Failed to retrieve user: ${err}` });
    }
  });
  



module.exports = router;