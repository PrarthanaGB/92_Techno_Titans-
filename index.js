const report = require('./report.json');

console.log("=== Website Audit Report ===");
report.results.forEach(r => {
  console.log(`${r.icon} ${r.title} -> ${r.message} [${r.status}]`);
});