import Shipment from "../models/Shipment.js";
import Quote from "../models/Quote.js";
import Contact from "../models/Contact.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    // ==========================
    // Dashboard Statistics
    // ==========================

    const totalShipments = await Shipment.countDocuments();

    const activeShipments = await Shipment.countDocuments({
      status: {
        $in: [
          "Processing",
          "Picked Up",
          "In Transit",
          "Out for Delivery",
        ],
      },
    });

    const deliveredShipments = await Shipment.countDocuments({
      status: "Delivered",
    });

    const totalQuotes = await Quote.countDocuments();

    const totalContacts = await Contact.countDocuments();

    const totalUsers = await User.countDocuments();

    // ==========================
    // Recent Activities
    // ==========================

    const recentShipments = await Shipment.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentQuotes = await Quote.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // ==========================
    // Shipment Status Summary
    // ==========================

    const shipmentStatus = await Shipment.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    // ==========================
    // Monthly Shipments
    // ==========================

    const monthlyShipments = await Shipment.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    // ==========================
    // Monthly Quotes
    // ==========================

    const monthlyQuotes = await Quote.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const shipmentChart = monthlyShipments.map((item) => ({
      month: months[item._id.month],
      count: item.count,
    }));

    const quoteChart = monthlyQuotes.map((item) => ({
      month: months[item._id.month],
      count: item.count,
    }));

    // ==========================
    // Response
    // ==========================

    res.status(200).json({
      success: true,

      stats: {
        totalShipments,
        activeShipments,
        deliveredShipments,
        totalQuotes,
        totalContacts,
        totalUsers,
      },

      shipmentStatus,

      monthlyShipments: shipmentChart,

      monthlyQuotes: quoteChart,

      recentShipments,

      recentQuotes,

      recentContacts,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard statistics.",
    });

  }
};