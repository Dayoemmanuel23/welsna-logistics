import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },

    customer_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    customer_phone: {
      type: String,
      default: "",
      trim: true,
    },

    origin: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    goods_type: {
      type: String,
      required: true,
    },

    custom_goods_type: {
      type: String,
      default: "",
      trim: true,
    },

    estimated_cost: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "New",
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Quote", quoteSchema);