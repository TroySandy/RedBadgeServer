const User = require("./UserModel");
const Media = require("./MediaModel");
const Comments = require("./CommentsModel");

User.hasMany(Media, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
User.hasMany(Comments, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

Media.hasMany(Comments, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Media.belongsTo(User, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Comments.belongsTo(User, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Media,
  Comments,
};
