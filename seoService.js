const axios = require("axios");
const { JSDOM } = require("jsdom");

exports.scan = async (website) => {
  try {
    const { data } = await axios.get(website);
    const dom = new JSDOM(data);
    const { document } = dom.window;

    return {
      title: document.querySelector("title")?.textContent || "Missing",
      metaDescription: document.querySelector("meta[name='description']")?.content || "Missing",
      h1: document.querySelector("h1")?.textContent || "Missing",
      imagesWithAlt: [...document.querySelectorAll("img")].filter(img => img.getAttribute("alt"))?.length || 0,
    };
  } catch (err) {
    return { error: "SEO scan failed", details: err.message };
  }
};