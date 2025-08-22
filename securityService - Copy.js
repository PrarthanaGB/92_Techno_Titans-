const axios = require("axios");

exports.scan = async (website) => {
  try {
    // Very basic checks (expand as needed)
    const response = await axios.get(website);
    return {
      https: website.startsWith("https"),
      xssProtection: response.headers["x-xss-protection"] || "Not Found",
      contentSecurityPolicy: response.headers["content-security-policy"] || "Not Found",
    };
  } catch (err) {
    return { error: "Security scan failed", details: err.message };
  }
};