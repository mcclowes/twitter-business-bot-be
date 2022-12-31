const generateTweet = require('./generateTweet')
const Twitter = require("twit");

const twitterConfig = {
  twitter: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  }
};

const postToTwitter = async () => {
  const tweet = await generateTweet()

  console.log("Creating Twitter client...");
  const T = new Twitter(twitterConfig.twitter);
  
  console.log("\nPosting to Twitter...");
  
  console.log(tweet);

  T.post("statuses/update", 
    { status: tweet }, 
    (err, data, response) => {
      if (err) {
        console.log("Error posting to Twitter...");
        console.log("error", err);
      } else {
        console.log("\nPosted!");
      }
    }
  );
  
  return tweet;
};

module.exports = postToTwitter