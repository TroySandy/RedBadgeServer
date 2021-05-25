const router = require("express").Router();
const { validateJWT } = require("../middleware");
const { Comments, Media, UnsplashModel, User } = require("../models");
const jwt = require("jsonwebtoken");

router.get("/practice", (req, res) => {
  res.send("Hey!! This is a practice route!!");
});

router.get("/all", validateJWT, async (req, res) => {
  // res.send("Hey!! This is a practice route!!");
  try {
    const allComments = await Comments.findAll().then((allComments) => {
      res.status(200).json({ Comments: allComments });
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to retrieve comments: ${err}` });
  }
});

router.post("/", validateJWT, async (req, res) => {
  const { userId } = req.user.id;
  try {
    const allComments = await User.findAll({
      where: { userId },
      include: [
        {
          model: Comments,
          include: [{ model: Media }],
        },
      ],
    }).then((res) => {
      res.status(200).json({
        allComments,
      });
      console.log(allComments);
    });
  } catch (err) {
    res.status;
  }
});

router.post("/comment", validateJWT, async (req, res) => {
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

router.post("/create", validateJWT, async (req, res) => {
  const { comment, rating, favorite, private, mediumId } = req.body;
  try {
    const newComment = await Comments.create({
      comment,
      rating,
      favorite,
      private,
      userId: req.user.id,
      mediumId,
    });
    res.status(201).json({
      newComment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Failed to create entry ${err}`,
    });
  }
});

router.put("/", validateJWT, async (req, res) => {
  const { comment, rating, favorite, private, id } = req.body;
  try {
    await Comments.update(
      { comment, rating, favorite, private },
      { where: { id: id }, returning: true }
    ).then((comment) => {
      res.status(200).json({
        message: "Log successfully updated",
        updatedComment: comment,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update log: ${err}`,
    });
  }
});

router.delete("/", validateJWT, async (req, res) => {
  const { id } = req.body;
  try {
    const query = {
      where: {
        id: id,
      },
    };
    await Comments.destroy(query);
    res.status(200).json({ message: "Comment removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed Task" });
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
    await Comments.destroy(query);
    res.status(200).json({ message: "Comment removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed Task" });
  }
});

module.exports = router;
