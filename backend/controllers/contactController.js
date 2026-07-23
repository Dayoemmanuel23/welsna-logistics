import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";

/*
|--------------------------------------------------------------------------
| CREATE CONTACT
|--------------------------------------------------------------------------
*/

export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Message sent succesfully.",
      contact,
    });

    // Send emails in background
    Promise.all([
      // Customer Email
      sendEmail({
        to: email,
        subject: "We Received Your Message",
        html: `
          <h2>Hello ${name},</h2>

          <p>Thank you for contacting Welsna Logistics.</p>

          <p>We have received your message and our team will respond shortly.</p>

          <hr>

          <p><strong>Subject:</strong> ${subject || "General Enquiry"}</p>

          <p>${message}</p>

          <br>

          <strong>Welsna Logistics</strong>
        `,
      }),

      // Admin Email
      sendEmail({
        to: process.env.EMAIL_USER,
        subject: "New Contact Form Submission",
        html: `
          <h2>New Contact Message</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone || "-"}</p>

          <p><strong>Subject:</strong> ${subject || "-"}</p>

          <hr>

          <p>${message}</p>
        `,
      }),
    ]).catch((err) => {
      console.error("Contact Email Error:", err);
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
| GET CONTACTS
|--------------------------------------------------------------------------
*/

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      contacts,
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
| UPDATE CONTACT
|--------------------------------------------------------------------------
*/

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    res.json({
      success: true,
      contact,
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
| DELETE CONTACT
|--------------------------------------------------------------------------
*/

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    res.json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};