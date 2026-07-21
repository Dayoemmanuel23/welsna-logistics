import mongoose from "mongoose";

const trackingHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: [
        "Processing",
        "Picked Up",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Delayed",
        "Cancelled",
      ],
      required: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    remark: {
      type: String,
      default: "",
      trim: true,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const shipmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    senderName: {
      type: String,
      required: true,
      trim: true,
    },

    senderEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    receiverName: {
      type: String,
      required: true,
      trim: true,
    },

    receiverEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
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

    status: {
      type: String,
      enum: [
        "Processing",
        "Picked Up",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Delayed",
        "Cancelled",
      ],
      default: "Processing",
    },

    mode: {
      type: String,
      enum: ["Air", "Ocean", "Inland"],
      default: "Ocean",
    },

    currentLocation: {
      type: String,
      default: "",
      trim: true,
    },

    estimatedDelivery: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date;
      },
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    trackingHistory: {
      type: [trackingHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shipment", shipmentSchema);