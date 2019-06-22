const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    category: {
      type: String,
      require: true,
      enum: ["restaurantes", "electrónicos", "otros"],
      default: "restaurantes"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
