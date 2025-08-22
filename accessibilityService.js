const axios = require("axios");
const { JSDOM } = require("jsdom");

exports.scan = async (website) => {
  try {
    const { data } = await axios.get(website);
    const dom = new JSDOM(data);
    const { document } = dom.window;

    return {
      hasLang: document.querySelector("html").getAttribute("lang") ? true : false,
      hasAltTags: [...document.querySelectorAll("img")].every(img => img.getAttribute("alt")),
      hasLabels: [...document.querySelectorAll("label")].length > 0
    };
  } catch (err) {
    return { error: "Accessibility scan failed", details: err.message };
  }
};