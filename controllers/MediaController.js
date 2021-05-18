const router = require("express").Router();
const { validateJWT } = require("../middleware");
const { Media, Comments } = require("../models");

router.get("/practice", (req, res) => {
  res.send("Hey!! This is a practice route!!");
});

router.post("/media", validateJWT, async (req, res) => {
  const { userId } = req.body;
  try {
    const allMedia = await Media.findAll({
      where: {
        userId: req.user.id,
      },
      include: [{ model: Comments }],
    }).then((allMedia) => {
      res.status(201).json({ Media: allMedia });
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to retrieve media: ${err}` });
  }
});

router.post("/upload", validateJWT, async (req, res) => {
  const {
    image,
    imageSecure,
    thumbnail,
    tags,
    blurhash,
    url_regular,
    url_thumb,
    artist,
    artist_image,
    portfolio_url,
    private,
  } = req.body;

  try {
    const newMedia = await Media.create({
      image,
      imageSecure,
      thumbnail,
      tags,
      blurhash,
      url_regular,
      url_thumb,
      artist,
      artist_image,
      portfolio_url,
      private,
      userId: req.user.id,
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

router.put("/", validateJWT, async (req, res) => {
  const { image, imageSecure, thumbnail, tags, private, id } = req.body;
  try {
    await Media.update(
      { image, imageSecure, thumbnail, tags, private },
      { where: { id: id }, returning: true }
    ).then((result) => {
      res.status(201).json({
        message: "Media successfully updated",
        updatedMedia: result,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update Media: ${err}`,
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
    await Media.destroy(query);
    res.status(201).json({ message: "Media removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed Task" });
  }
});

module.exports = router;
