const express = require("express");
const app = express();

const postToTwitter = require('./postToTwitter.js')

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const tweet = await postToTwitter();
  res.end(`{"success" : "Tweeted Successfully: ${tweet}", "status" : 200}`);
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;