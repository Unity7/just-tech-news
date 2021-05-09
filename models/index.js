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
});

// Users/Posts assoication to votes
User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

//Vote association to user and post
Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
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
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Vote, Comment };
