const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const brand = require("./brand");
const category = require("./category");

const ItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("itemSchema", ItemSchema);
