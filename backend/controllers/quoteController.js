import Quote from "../models/Quote.js";
import { sendEmail } from "../utils/sendEmail.js";

/*
|--------------------------------------------------------------------------
| CREATE QUOTE
|--------------------------------------------------------------------------
*/

export const createQuote = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      origin,
      destination,
      weight,
      goods_type,
      custom_goods_type,
      estimated_cost,
      status,
    } = req.body;

    if (
      !customer_name ||
      !customer_email ||
      !origin ||
      !destination ||
      !weight ||
      !goods_type
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    const quote = await Quote.create({
      customer_name,
      customer_email,
      customer_phone,
      origin,
      destination,
      weight,
      goods_type,
      custom_goods_type,
      estimated_cost,
      status,
    });

    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Quote request submitted successfully.",
      quote,
    });

    // Send emails without delaying response
    Promise.all([
      // Customer Email
      sendEmail({
        to: customer_email,
        subject: "Your Welsna Logistics Quote Request",
        html: `
          <h2>Hello ${customer_name},</h2>

          <p>Thank you for requesting a quotation from <strong>Welsna Logistics</strong>.</p>

          <p>We have received your request successfully and our logistics team will contact you shortly.</p>

          <hr>

          <p><strong>Origin:</strong> ${origin}</p>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Weight:</strong> ${weight} kg</p>

          <br>

          <p>Thank you for choosing Welsna Logistics.</p>

          <p>
          Best Regards,<br>
          <strong>Welsna Logistics</strong>
          </p>
        `,
      }),

      // Admin Email
      sendEmail({
        to: process.env.EMAIL_USER,
        subject: "New Quote Request Received",
        html: `
          <h2>New Quote Request</h2>

          <p><strong>Name:</strong> ${customer_name}</p>
          <p><strong>Email:</strong> ${customer_email}</p>
          <p><strong>Phone:</strong> ${customer_phone || "-"}</p>

          <hr>

          <p><strong>Origin:</strong> ${origin}</p>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Weight:</strong> ${weight} kg</p>

          <p>
          <strong>Goods:</strong>
          ${
            goods_type === "Other"
              ? custom_goods_type
              : goods_type
          }
          </p>

          <p>
          <strong>Estimated Cost:</strong>
          ₦${Number(estimated_cost || 0).toLocaleString()}
          </p>
        `,
      }),
    ]).catch((err) => {
      console.error("Quote Email Error:", err);
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL QUOTES
|--------------------------------------------------------------------------
*/

export const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      quotes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE QUOTE
|--------------------------------------------------------------------------
*/

export const getQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found.",
      });
    }

    res.json({
      success: true,
      quote,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE QUOTE
|--------------------------------------------------------------------------
*/

export const updateQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found.",
      });
    }

    res.json({
      success: true,
      message: "Quote updated successfully.",
      quote,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE QUOTE
|--------------------------------------------------------------------------
*/

export const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(
      req.params.id
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found.",
      });
    }

    res.json({
      success: true,
      message: "Quote deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};