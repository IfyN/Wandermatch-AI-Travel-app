const axios = require("axios");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend works" });
});

app.post("/api/places/search", async (req, res) => {
  const { destination } = req.body;

  try {
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: destination,
      },
      {
        headers: {
          "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.rating",
        },
      },
    );

    console.log("Google API Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
