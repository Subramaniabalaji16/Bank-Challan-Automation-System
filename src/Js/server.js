require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST Endpoint for sending emails
app.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  // Log incoming data for debugging
  console.log("Received Data:", req.body);

  // Email transporter configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD, 
    },
  });

  const mailOptions = {
    from: email, // Sender's email
    to: process.env.EMAIL, // Receiver email from .env
    subject: `Message from ${email}: ${subject}`,
    text: message, // Email content
  };

  try {
    // Attempt to send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Failed to send email.",
      error: error.message,
      details: error.response, // More info about SMTP errors
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
