// backend/services/performanceScan.js

/**
 * Dummy performance scan function
 * In future, integrate real tools (like Lighthouse or Puppeteer)
 */
module.exports = function performanceScan(websiteUrl) {
  return {
    status: "success",
    website: websiteUrl,
    score: Math.floor(Math.random() * 100), // random performance score
    message: "Dummy performance scan completed"
  };
};
