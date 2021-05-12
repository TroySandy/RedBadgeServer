// const router = require("express").Router();
// const { UniqueConstraintError } = require("sequelize");
// const { validateJWT } = require("../middleware");
// const { User, Media, Comments } = require("../models");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// router.get("/userinfo", async (req, res)=> {
//     try {
//         await User.findAll({
//             include: [
//                 {
//                     model: Media,
//                     include: [
//                         {
//                             model: Comments
//                         }
//                     ]
//             }
//         ]
//         })
//         .then( users => {
//             res.status(200).json({ users: users});
//         }) 
//     }
//     catch (err) {
//         res.status(500).json({ errorerror: `Failed to retrieve users: ${err}`})
//     }
// }




// module.exports = router;