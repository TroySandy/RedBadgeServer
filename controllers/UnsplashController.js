const router = require("express").Router();
const { validateJWT } = require("../middleware");
const { UnsplashModel } = require("../models");

router.get("/practice", (req, res) => {
  res.send("Hey!! This is a practice route!!");
});

router.get("/media", async (req, res) => {
  // res.send("Hey!! This is a practice route!!");
  try {
    const allUnsplash = await UnsplashModel.findAll().then((allUnsplash) => {
      res.status(200).json({ Unsplash: allUnsplash });
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to retrieve media: ${err}` });
  }
});

router.post("/upload", validateJWT, async (req, res) => {
  const {
    blurhash,
    url_regular,
    url_thumb,
    artist,
    artist_image,
    portfolio_url,
    commentId,
    private,
  } = req.body;

  try {
    const newUnsplash = await UnsplashModel.create({
      blurhash,
      url_regular,
      url_thumb,
      artist,
      artist_image,
      portfolio_url,
      commentId,
      private,
      userId: req.user.id,
    });
    res.status(201).json({
      message: "File Uploaded",
      newUnsplash,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Failed to upload file ${err}`,
    });
  }
});

router.put("/", validateJWT, async (req, res) => {
  const {
    blurhash,
    url_regular,
    url_thumb,
    artist,
    artist_image,
    portfolio_url,
    private,
    id,
  } = req.body;
  try {
    await UnsplashModel.update(
      {
        blurhash,
        url_regular,
        url_thumb,
        artist,
        artist_image,
        portfolio_url,
        private,
      },
      { where: { id: id }, returning: true }
    ).then((result) => {
      res.status(200).json({
        message: "Unsplash successfully updated",
        updatedUnsplash: result,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update Unsplash: ${err}`,
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
    await UnsplashModel.destroy(query);
    res.status(200).json({ message: "Media removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed Task" });
  }
});

module.exports = router;
