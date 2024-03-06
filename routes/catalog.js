const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");
const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");

// Home Page
router.get("/", (req, res) => {
  res.render("layout");
});

// Operations I need for all.
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

// Item Routes
router.get("/item", item_controller.item_list);

router.get("/item/create", item_controller.item_create_get);
router.get("/item/create", item_controller.item_create_post);

router.get("/item/:id/delete", item_controller.item_delete_get);
router.get("/item/:id/delete", item_controller.item_delete_post);

router.get("/item/:id/update", item_controller.item_update_get);
router.get("/item/:id/update", item_controller.item_update_post);

// Brand Routes
router.get("/brand", brand_controller.brand_list);
router.get("/brand/:id", brand_controller.brand_detail);

// Category Routes
router.get("/category", category_controller.category_list);
router.get("/category/:id", category_controller.category_detail);

module.exports = router;
