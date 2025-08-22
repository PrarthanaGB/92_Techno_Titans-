const axe = require('axe-core');
const puppeteer = require('puppeteer');

async function accessibilityScan(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const results = await page.evaluate(async () => {
        return await axe.run(document);
    });

    await browser.close();
    return results;
}

module.exports = accessibilityScan;
