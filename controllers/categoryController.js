const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategorys = await Category.find({}).sort({ title: 1 }).exec();

  res.render("category_list", {
    title: "Shop by Categories",
    category_list: allCategorys,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, itemInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);
  if (category === null) {
    const err = new Error("Brand not found");
    err.status = 404;
    return next(err);
  }
  console.log(category);

  res.render("brand_detail", {
    title: `${category.name} Products`,
    brand_detail: itemInCategory,
  });
});
