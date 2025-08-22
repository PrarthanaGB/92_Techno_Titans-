// backend/services/securityScan.js

const axios = require("axios");
const dns = require("dns").promises;

/**
 * Run security checks on a given website
 * @param {string} url - Website URL
 * @returns {Promise<Object>} - Security report
 */
async function runSecurityScan(url) {
  const report = {
    url,
    https: false,
    headers: {},
    vulnerabilities: [],
  };

  try {
    // 1. Check if site is using HTTPS
    report.https = url.startsWith("https://");

    // 2. Fetch site headers
    const response = await axios.get(url, { timeout: 10000 });
    report.headers = response.headers;

    // 3. Check for missing security headers
    checkSecurityHeaders(report);

    // 4. Check DNS records (basic security check)
    await checkDNS(report, url);

  } catch (error) {
    report.vulnerabilities.push(`Error scanning site: ${error.message}`);
  }

  return report;
}

/**
 * Check important security headers
 */
function checkSecurityHeaders(report) {
  const headers = report.headers;
  const missingHeaders = [];

  if (!headers["content-security-policy"]) missingHeaders.push("Content-Security-Policy");
  if (!headers["x-frame-options"]) missingHeaders.push("X-Frame-Options");
  if (!headers["x-content-type-options"]) missingHeaders.push("X-Content-Type-Options");
  if (!headers["strict-transport-security"]) missingHeaders.push("Strict-Transport-Security");

  if (missingHeaders.length > 0) {
    report.vulnerabilities.push(`Missing headers: ${missingHeaders.join(", ")}`);
  }
}

/**
 * Check DNS security records like SPF, DKIM, DMARC
 */
async function checkDNS(report, url) {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];

  try {
    const txtRecords = await dns.resolveTxt(domain);

    const spf = txtRecords.some(record => record.join("").includes("v=spf1"));
    const dmarc = txtRecords.some(record => record.join("").includes("v=DMARC1"));

    if (!spf) report.vulnerabilities.push("Missing SPF record");
    if (!dmarc) report.vulnerabilities.push("Missing DMARC record");

  } catch (err) {
    report.vulnerabilities.push(`DNS check failed: ${err.message}`);
  }
}

module.exports = { runSecurityScan };