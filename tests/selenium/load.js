
const assert = require('node:assert/strict');
const { Builder, By } = require('selenium-webdriver');

async function main() {
    let driver;

    try {
        driver = await new Builder()
            .forBrowser('chrome')
            .build();

        await driver.get('http://localhost:8080');

        const title = await driver.getTitle();
        const body = await driver.findElement(By.css('body')).getText();

        assert.ok(body.trim().length > 0, 'Game page is empty');

        console.log('PASS: Game loaded successfully');
        console.log('Title:', title);
        console.log('Body:', body.slice(0, 200));

    } catch (error) {
        console.error('FAIL:', error);
        process.exitCode = 1;
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

main();
