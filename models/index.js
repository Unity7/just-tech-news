const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
const Comment = require("./Comment");
// create associations

//user to post association
User.hasMany(Post, {
  foreignKey: "user_id",
});

//Post to user association
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// Users/Posts assoication to votes
User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

//Vote association to user and post
Vote.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Post.hasMany(Vote, {
  foreignKey: "post_id",
});

//comments assocaitions
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Vote, Comment };
