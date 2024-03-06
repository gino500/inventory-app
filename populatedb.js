#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Brand = require("./models/brand");
const Category = require("./models/category");

const items = [];
const brands = [];
const categorys = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
main().catch(err => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createBrand();
  await createCategory();
  await createItem();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function brandCreate(index, name) {
  const brand = new Brand({ name: name });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categorys[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, title, description, price, brand, category) {
  const itemdetail = {
    title: title,
    description: description,
    price: price,
  };
  if (brand !== false && category !== false) {
    itemdetail.brand = brand;
    itemdetail.category = category;
  }
  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${title}`);
}

async function createBrand() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(0, "Rouge"),
    brandCreate(1, "Optimum"),
    brandCreate(2, "Eleiko"),
  ]);
}

async function createCategory() {
  console.log("Adding categorys");
  await Promise.all([
    categoryCreate(0, "Weights"),
    categoryCreate(1, "Barbell"),
    categoryCreate(2, "Misc"),
  ]);
}

async function createItem() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      0,
      "Lifting Straps",
      "Straps designed to help you hold onto dear life! Our motto here is.. Strap up or tap out. Made in the USA",
      10,
      brands[1],
      categorys[2]
    ),
    itemCreate(
      1,
      "TX Deadlift Bar",
      "Texas Deadlift Bar: Whip friendly. Made in the USA",
      155,
      brands[0],
      categorys[1]
    ),
    itemCreate(
      2,
      "Dumbells",
      "2 50lb dumbells. Pure Steel. Made in the USA",
      65,
      brands[2],
      categorys[0]
    ),
  ]);
}
