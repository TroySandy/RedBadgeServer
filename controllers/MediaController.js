const router = require("express").Router();
const { validateJWT } = require("../middleware");
const { Media, Comments } = require("../models");
const jwt = require("jsonwebtoken");

router.get("/practice", (req, res) => {
  res.send("Hey!! This is a practice route!!");
});

router.get("/media", validateJWT, async (req, res) => {
  try {
    const allMedia = await Media.findAll({
      include: [{ model: Comments }],
    }).then((allMedia) => {
      res.status(201).json({ Media: allMedia });
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to retrieve media: ${err}` });
  }
});

router.post("/photo", validateJWT, async (req, res) => {
  const { id } = req.body;
  try {
    const photo = await Media.findAll({
      where: {
        id: id,
      },
      include: [{ model: Comments }],
    }).then((photo) => {
      res.status(201).json({ photo: photo });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/upload", validateJWT, async (req, res) => {
  const {
    image,
    thumbnail,
    blur_hash,
    url_thumb,
    url_small,
    url_reg,
    url_raw,
    artist_name,
    artist_img,
    portfolio_url,
    private,
    favorite,
  } = req.body;

  try {
    const newMedia = await Media.create({
      image,
      thumbnail,
      blur_hash,
      url_thumb,
      url_small,
      url_reg,
      url_raw,
      artist_name,
      artist_img,
      portfolio_url,
      private,
      favorite,
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
  const { favorite, private, id } = req.body;
  try {
    await Media.update(
      { favorite, private },
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

router.delete("/admin", async (req, res) => {
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
