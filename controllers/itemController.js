const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

/* 
Create
  Get
  Post
 Delete
  Get
  Post
 Update
  Get
  Post
*/

// Home page
// list all items

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({})
    .sort({ title: 1 })
    .populate("brand category")
    .exec();

  res.render("item_list", {
    title: "List of all Products",
    item_list: allItems,
  });
});

// Display specific item Details

// CREATE item Form GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("create get");
});
// CREATE item Form POST
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("List all items");
});

//
// DELETE item Form GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("delete get");
});
// DELETE item Form POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("List all items");
});

//
// UPDATE item Form GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("List all items");
});
// UPDATE item Form POST
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("List all items");
});
