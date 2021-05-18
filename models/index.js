const User = require("./UserModel");
const Media = require("./MediaModel");
const Comments = require("./CommentsModel");
// const UnsplashModel = require("./UnsplashModel");

User.hasMany(Media, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
User.hasMany(Comments, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
// User.hasMany(UnsplashModel, {
//   foreignKey: { allowNull: false },
//   onDelete: "CASCADE",
// });

Media.hasMany(Comments, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Media.belongsTo(User, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
// Comments.hasMany(UnsplashModel, {
//   foreignKey: { allowNull: false },
//   onDelete: "CASCADE",
// });
Comments.belongsTo(User, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// UnsplashModel.belongsTo(Comments, {
//   foreignKey: { allowNull: false },
//   onDelete: "CASCADE",
// });

module.exports = {
  User,
  Media,
  Comments,
  // UnsplashModel,
};
