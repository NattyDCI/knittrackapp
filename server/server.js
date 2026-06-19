// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const RAVELRY_USERNAME = process.env.RAVELRY_USERNAME;
const RAVELRY_PASSWORD = process.env.RAVELRY_PASSWORD;


const authHeader =
  "Basic " +
  Buffer.from(`${RAVELRY_USERNAME}:${RAVELRY_PASSWORD}`).toString("base64");

app.get("/api/ravelry/patterns", async (req, res) => {
  try {
    const query = req.query.q || "scarf";

    const response = await fetch(
      `https://api.ravelry.com/patterns/search.json?query=${encodeURIComponent(
        query,
      )}&page_size=12`,
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );

    const text = await response.text();


    if (!response.ok) {
      return res.status(response.status).send(text);
    }

    res.json(JSON.parse(text));
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/ravelry/categories", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.ravelry.com/pattern_categories/list.json",
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );

    const text = await response.text();

    console.log("RAVELRY CATEGORY STATUS:", response.status);
    console.log("RAVELRY CATEGORY RESPONSE:", text);

    if (!response.ok) {
      return res.status(response.status).send(text);
    }

    res.json(JSON.parse(text));
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});