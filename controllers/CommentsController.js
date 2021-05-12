const router = require("express").Router();
const { validateJWT } = require("../middleware");
const { Comments } = require("../models");
const jwt = require("jsonwebtoken");

router.get("/practice", (req, res) => {
  res.send("Hey!! This is a practice route!!");
});

router.get("/comments", async (req, res) => {
  // res.send("Hey!! This is a practice route!!");
  try {
    const allComments = await Comments.findAll().then((allComments) => {
      res.status(200).json({ Comments: allComments });
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to retrieve comments: ${err}` });
  }
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
  const { comment, heading, rating, favorite, private, mediumId } = req.body;
  try {
    const newComment = await Comments.create({
      comment,
      heading,
      rating,
      favorite,
      private,
      mediumId: mediumId,
      userId: req.user.id,
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

router.put("/", validateJWT, async (req, res) => {
  const { comment, heading, rating, favorite, private, id } = req.body;
  try {
    await Comments.update(
      { comment, heading, rating, favorite, private },
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

//below we are using the validateJWT function, to verify that ther person who is trying to delete a review is logged in with a valid token from our validate function and that the review they are deleting is theirs. 
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



module.exports = router;
