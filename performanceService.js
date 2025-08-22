const axios = require("axios");

exports.scan = async (website) => {
  try {
    const start = Date.now();
    await axios.get(website);
    const loadTime = Date.now() - start;

    return {
      responseTimeMs: loadTime,
      isFast: loadTime < 2000
    };
  } catch (err) {
    return { error: "Performance scan failed", details: err.message };
  }
};