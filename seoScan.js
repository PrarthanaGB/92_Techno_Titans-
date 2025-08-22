// backend/services/seoScan.js

module.exports = function seoScan(websiteUrl) {
  // Simple placeholder SEO check
  return {
    status: "ok",
    checks: [
      { rule: "Has title tag", passed: true },
      { rule: "Has meta description", passed: true },
      { rule: "Uses HTTPS", passed: true }
    ],
    message: `SEO scan completed for ${websiteUrl}`
  };
};
