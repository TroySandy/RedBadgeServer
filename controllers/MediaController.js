const router = require("express").Router();
const { validateJWT } = require("../middleware");
const { Media } = require("../models");
const jwt = require("jsonwebtoken");


router.get("/practice", (req, res) => {
    res.send("Hey!! This is a practice route!!");
  });

router.post("/", validateJWT, async (req, res) => {
    const {
      media,
      title,
      private,
    } = req.body;

    try {
      const newMedia = await Media.create({
        media,
        title,
        private,
        userId: req.user.id
      });
      res.status(201).json({
        message: "File Uploaded",
        newMedia,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Failed to upload file ${err}`,
      });
    }
  });










  module.exports = router;