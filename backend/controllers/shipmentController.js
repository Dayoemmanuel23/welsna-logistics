import Shipment from "../models/Shipment.js";
import generateTrackingNumber from "../utils/generateTrackingNumber.js";
import { sendEmail } from "../utils/sendEmail.js";

/**
 * CREATE SHIPMENT
 */
export const createShipment = async (req, res) => {
  try {
    const {
      senderName,
      senderEmail,
      receiverName,
      receiverEmail,
      origin,
      destination,
      description,
      status,
      mode,
      currentLocation,
      estimatedDelivery,
    } = req.body;

    const trackingNumber = await generateTrackingNumber();

    const shipment = await Shipment.create({
      trackingNumber,
      senderName,
      senderEmail,
      receiverName,
      receiverEmail,
      origin,
      destination,
      description,
      status,
      mode,
      currentLocation,
      estimatedDelivery,

      trackingHistory: [
        {
          status: status || "Processing",
          location: currentLocation || origin,
          remark: "Shipment created",
        },
      ],
    });

    // Email receiver (optional)

    // Return response immediately
res.status(201).json({
  success: true,
  shipment,
});

// Send email in the background
if (receiverEmail) {
  sendEmail({
    to: receiverEmail,
    subject: `Shipment Created - ${trackingNumber}`,
    html: `
      <h2>Shipment Created</h2>

      <p>Hello ${receiverName},</p>

      <p>Your shipment has been created successfully.</p>

      <table cellpadding="8">
        <tr>
          <td><strong>Tracking Number</strong></td>
          <td>${trackingNumber}</td>
        </tr>

        <tr>
          <td><strong>Origin</strong></td>
          <td>${origin}</td>
        </tr>

        <tr>
          <td><strong>Destination</strong></td>
          <td>${destination}</td>
        </tr>

        <tr>
          <td><strong>Status</strong></td>
          <td>${status || "Processing"}</td>
        </tr>
      </table>

      <p>
        You can track your shipment anytime on the
        Welsna Logistics website.
      </p>

      <br>

      <strong>Welsna Logistics</strong>
    `,
  }).catch((err) => {
    console.error("Shipment Email Error:", err);
  });
}

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create shipment.",
    });
  }
};


/**
 * GET ALL SHIPMENTS
 */
export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      shipments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET SHIPMENT BY TRACKING NUMBER
 */
export const getShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      trackingNumber: req.params.trackingNumber,
    });

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });
    }

    res.json({
      success: true,
      shipment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE SHIPMENT
 */
export const updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });
    }

    Object.assign(shipment, req.body);

    await shipment.save();

    res.json({
      success: true,
      shipment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ADD TRACKING HISTORY
 */
export const addTrackingHistory = async (req, res) => {
  try {
    const {
      status,
      location,
      remark,
    } = req.body;

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });
    }

    shipment.status = status;
    shipment.currentLocation = location;

    shipment.trackingHistory.push({
      status,
      location,
      remark,
    });

    await shipment.save();

    // Email receiver

    // Respond immediately
res.json({
  success: true,
  shipment,
});

// Send update email in background
if (shipment.receiverEmail) {
  sendEmail({
    to: shipment.receiverEmail,
    subject: `Shipment Update - ${shipment.trackingNumber}`,
    html: `
      <h2>Shipment Status Updated</h2>

      <p>Hello ${shipment.receiverName},</p>

      <table cellpadding="8">
        <tr>
          <td><strong>Tracking Number</strong></td>
          <td>${shipment.trackingNumber}</td>
        </tr>

        <tr>
          <td><strong>Status</strong></td>
          <td>${status}</td>
        </tr>

        <tr>
          <td><strong>Current Location</strong></td>
          <td>${location}</td>
        </tr>

        <tr>
          <td><strong>Remark</strong></td>
          <td>${remark}</td>
        </tr>
      </table>

      <p>
        Thank you for choosing Welsna Logistics.
      </p>

      <strong>Welsna Logistics</strong>
    `,
  }).catch((err) => {
    console.error("Shipment Update Email Error:", err);
  });
}
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE SHIPMENT
 */
export const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });
    }

    res.json({
      success: true,
      message: "Shipment deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};