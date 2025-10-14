const express = require("express");
require("dotenv").config()
const cors = require("cors");
const { createClient } = require("redis");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

let redisClient = null;
let isConnected = false;

async function initializeRedis() {
  // If Redis URL is not provided, skip Redis initialization
  if (!process.env.REDIS_URL) {
    console.log("⚠️ REDIS_URL not found. Running without Redis.");
    return null;
  }

  try {
    console.log("🔗 Initializing Redis connection...");
    console.log(
      "📡 Redis URL:",
      process.env.REDIS_URL.replace(/:[^:]*@/, ":****@")
    ); // Hide password

    // Validate Redis URL format
    if (
      !process.env.REDIS_URL.startsWith("redis://") &&
      !process.env.REDIS_URL.startsWith("rediss://")
    ) {
      console.log("⚠️ Adding redis:// protocol prefix");
      process.env.REDIS_URL = "redis://" + process.env.REDIS_URL;
    }

    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 60000,
        lazyConnect: true,
      },
    });

    redisClient.on("error", (err) => {
      console.error("❌ Redis Client Error:", err.message);
      isConnected = false;
    });

    redisClient.on("connect", () => {
      console.log("🔗 Redis Client Connecting...");
    });

    redisClient.on("ready", () => {
      console.log("✅ Redis Client Ready");
      isConnected = true;
    });

    redisClient.on("end", () => {
      console.log("🔌 Redis Client Disconnected");
      isConnected = false;
    });

    await redisClient.connect();
    console.log("🎉 Redis Client Connected Successfully");
    return redisClient;
  } catch (error) {
    console.error("❌ Failed to connect to Redis:", error.message);
    console.log("⚠️ Application will run without Redis caching");
    return null;
  }
}

// Example route: cache API response
app.get("/api/news", async (req, res) => {
  console.log("fetching news");
  const cached = await redisClient.get("news");

  if (cached && cached.length > 0) {
    console.log("Cache hit");
    return res.json(JSON.parse(cached));
  }
  const url =
    "https://newsapi.org/v2/everything?" +
    "q=Epic%20games&" +
    "from=2025-10-03&" +
    "sortBy=popularity&" +
    "apiKey=5c6be23958a747858dd11fb381cda64e";

  try {
    const _res = await axios.get(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
    );

    console.log("Cache miss");
    const data = _res.data;
    await redisClient.setEx("news", 3600, JSON.stringify(data)); // cache 1h
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      error: err,
    });
  }
});

app.get("/api/games/:pagenum", async (req, res) => {
  const { pagenum } = req.params;
  console.log("fetching game " + pagenum);
  const cached = await redisClient.get("game/" + pagenum);

  if (cached && cached.length > 0) {
    console.log("Game Cache hit");
    return res.json(JSON.parse(cached));
  }

  const url = `https://api.rawg.io/api/games?key=051442f84dc3402b885a0e52cecb4272&page=${pagenum}&ordering=-metacritic`;
  console.log("fetching", url);

  try {
    const _res = await axios.get(url);
    const data = _res.data;
    redisClient.setEx("game/" + pagenum, 3600, JSON.stringify(data));
    res.json(data);
  } catch (err) {
    console.error("Fetching games failed: ", err);
    return res.status(500).json({
      error: err,
    });
  }
});

initializeRedis();

app.listen(process.env.PORT || 3000, () => console.log("Server running on port 3000"));
