// server.js (ESM version)
import express from "express";
import cors from "cors";
import qrcode from "qrcode";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database simulation
const profiles = [
  {
    id: "123",
    name: "Sarah Johnson",
    title: "Senior Software Engineer",
    description:
      "Passionate about creating innovative web solutions and mentoring junior developers.",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    email: "neerajkumarsharma013@gmail.com",
    publicReviews: [],
    averageRating: 0,
    totalReviews: 0,
  },
];

// Configure fake email transporter (for demo purposes)
const emailTransporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: "demo@example.com",
    pass: "demo-password",
  },
});

// Helper function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
};

// Routes

// Get all profiles
app.get("/api/profiles", (req, res) => {
  res.json(profiles);
});

// Get specific profile
app.get("/api/profiles/:profileId", (req, res) => {
  const { profileId } = req.params;
  const profile = profiles.find((p) => p.id === profileId);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  res.json(profile);
});

// Generate QR code for profile
app.get("/api/qrcode/:profileId", async (req, res) => {
  const { profileId } = req.params;
  const profile = profiles.find((p) => p.id === profileId);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  try {
    const reviewUrl = `http://localhost:5173/review/${profileId}`;
    const qrCodeBuffer = await qrcode.toBuffer(reviewUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    res.setHeader("Content-Type", "image/png");
    res.send(qrCodeBuffer);
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Submit review
app.post("/api/reviews", async (req, res) => {
  const { profileId, rating, comment, reviewerName } = req.body;

  if (!profileId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid review data" });
  }

  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  const review = {
    id: uuidv4(),
    profileId,
    rating: parseInt(rating),
    comment: comment || null,
    reviewerName: reviewerName || null,
    createdAt: new Date(),
    isPublic: rating >= 4,
  };

  try {
    if (review.isPublic) {
      profile.publicReviews.push(review);
      profile.publicReviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else {
      console.log(`📧 PRIVATE FEEDBACK EMAIL TO: ${profile.email}`);
      console.log(`Rating: ${rating}/5`);
      console.log(`Comment: ${comment || "No comment"}`);

      // Real email example (disabled in demo):
      // await emailTransporter.sendMail({ ... });
    }

    profile.totalReviews += 1;
    profile.averageRating = calculateAverageRating(profile.publicReviews);

    res.json({
      success: true,
      isPublic: review.isPublic,
      message: review.isPublic
        ? "Review submitted and will appear publicly"
        : "Review submitted privately to the profile owner",
    });
  } catch (error) {
    console.error("Error processing review:", error);
    res.status(500).json({ error: "Failed to submit review" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
