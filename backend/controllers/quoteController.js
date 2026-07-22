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

    // Email temporarily disabled for testing

    res.status(201).json({
      success: true,
      message: "Quote created successfully.",
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