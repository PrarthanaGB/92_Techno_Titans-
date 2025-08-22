const securityService = require("./securityService");
const seoService = require("./seoService");
const performanceService = require("./performanceService");
const accessibilityService = require("./accessibilityService");

exports.fullAudit = async (website) => {
  return {
    security: await securityService.scan(website),
    seo: await seoService.scan(website),
    performance: await performanceService.scan(website),
    accessibility: await accessibilityService.scan(website)
  };
};