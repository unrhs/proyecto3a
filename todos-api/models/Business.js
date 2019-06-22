const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessSchema = new Schema(
  {
    business: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory"
    },
    description: {
      required: true,
      type: String
    },

    phone: {
      required: true,
      unique: true,
      type: Number
    },
    email: {
      required: true,
      type: String
    },
    address: {
      required: true,
      type: String
    },
    images: {
      type: [String]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
