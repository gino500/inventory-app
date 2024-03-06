const Brand = require("../models/brand");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find({}).sort({ title: 1 }).exec();

  res.render("brand_list", { title: "Shop by Brands", brand_list: allBrands });
});

exports.brand_detail = asyncHandler(async (req, res, next) => {
  const [brand, itemInBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Item.find({ brand: req.params.id }).exec(),
  ]);
  if (brand === null) {
    const err = new Error("Brand not found");
    err.status = 404;
    return next(err);
  }
  console.log(brand);

  res.render("brand_detail", {
    title: `${brand.name} Products`,
    brand_detail: itemInBrand,
  });
});
