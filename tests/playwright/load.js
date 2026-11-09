
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

async function main() {
    let browser;

    try {
        browser = await chromium.launch({
            channel: 'chrome',
            headless: false
        });

        const page = await browser.newPage();

        await page.goto('http://localhost:8080');

        const title = await page.title();
        const body = await page.locator('body').innerText();

        assert.ok(body.trim().length > 0, 'Game page is empty');

        console.log('PASS: Game loaded successfully');
        console.log('Title:', title);
        console.log('Body:', body.slice(0, 200));

    } catch (error) {
        console.error('FAIL:', error);
        process.exitCode = 1;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

main();
