const router = require("express").Router();
const { validateJWT } = require("../middleware");
const { Comments } = require("../models");
const jwt = require("jsonwebtoken");

router.get("/practice", (req, res) => {
    res.send("Hey!! This is a practice route!!");
  });

  router.get("/", async (req, res) => {
    const { userId } = req.body;
    try {
      const commentsUser = await Comments.findAll({
        where: {
          userId,
        },
      });
      res.status(200).json(commentsUser);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  router.post("/", validateJWT, async (req, res) => {
    const {
      comment,
      heading,
      rating,
      favorite,
      private,
      mediumId
    } = req.body;
    try {
      const newComment = await Comments.create({
        comment,
        heading,
        rating,
        favorite,
        private,
        mediumId: mediumId,
        userId: req.user.id
      });
      res.status(201).json({
        message: "Comment created",
        newComment,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Failed to create entry ${err}`,
      });
    }
  });











  module.exports = router;