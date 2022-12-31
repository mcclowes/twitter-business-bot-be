const axios = require('axios'); // Only needed if fetching from other URLs
const express = require("express");

const app = express();

const prefix = "Red-hot business idea: "

const randomItem = (items) => items[Math.floor(Math.random()*items.length)];

const generateTweet = async () => {
  console.log("Fetching data...");
  
  const data = await axios
    .get(process.env.GOOGLE_SHEET_ENDPOINT)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
  
  let twists = [] 
  let ideas = [] 
  let markets = [] 
  
  console.log(data)
  
  data.sheet1.forEach(item=>{
    if(item.twists) { twists.push(item.twists) }
    if(item.ideas) { ideas.push(item.ideas) }
    if(item.markets) { markets.push(item.markets) }
  })
    
  return prefix + randomItem(twists) + ' ' + randomItem(ideas) + ' for ' + randomItem(markets) + '.';
}

app.get("/", async (req, res) => {
  const data = await generateTweet()
  res.send(data);
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;