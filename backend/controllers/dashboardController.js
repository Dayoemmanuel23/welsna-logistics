import Shipment from "../models/Shipment.js";
import Quote from "../models/Quote.js";
import Contact from "../models/Contact.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const [
      totalShipments,
      totalQuotes,
      totalContacts,
      totalUsers,
      activeShipments,
      deliveredShipments,
      recentShipments,
      recentQuotes,
      recentContacts,
    ] = await Promise.all([
      Shipment.countDocuments(),
      Quote.countDocuments(),
      Contact.countDocuments(),
      User.countDocuments(),

      Shipment.countDocuments({ status: "Processing" }),

      Shipment.countDocuments({ status: "Delivered" }),

      Shipment.find()
        .sort({ createdAt: -1 })
        .limit(5),

      Quote.find()
        .sort({ createdAt: -1 })
        .limit(5),

      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const monthlyQuotes = await Quote.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const monthlyShipments = await Shipment.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const shipmentStatus = await Shipment.aggregate([
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,

      stats: {
        totalShipments,
        activeShipments,
        deliveredShipments,
        totalQuotes,
        totalContacts,
        totalUsers,
      },

      dashboard: {
        shipmentStatus,
        monthlyShipments,
        monthlyQuotes,
        recentShipments,
        recentQuotes,
        recentContacts,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};