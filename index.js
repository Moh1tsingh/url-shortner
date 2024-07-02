const express = require("express");
const shortid = require("shortid");
const app = express();
const PORT = 3000;

app.use(express.json());

const map = new Map();

app.get("/", (req, res) => {
  const body = req.body;
  if (!body) return res.status(400).json({ message: "No url provided" });
  const shortURL = shortid();
  map.set(shortURL, body.url);
  res.json({ shortURL: `http://localhost:3000/${shortURL }}`});
});

app.get("/:shortId", (req, res) => {
  const shortId = req.params.shortId;
  map.has(shortId)
    ? res.redirect(map.get(shortId))
    : res.status(404).json({ message: "URL not found" });
});

app.listen(PORT, () => {
  console.log("Server running on port 3000 ...");
});
