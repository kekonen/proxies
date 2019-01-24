p = require('puppeteer')
fs = require('fs')

console.log('kek');

(async () => {
	const headless = false
	const width = 1337
	const height = 777
	const browser = await p.launch({
        headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox', ...!headless?[`--window-size=${width},${height}`]:[]],
        defaultViewport: {
            width,
            height
        }
    })
	const page = await browser.newPage();
	await page.goto('http://spys.one/en/free-proxy-list/');
	await page.waitForSelector('#xpp')

	await page.select('#xpp', '5')

	await page.waitForSelector('tr.spy1x:nth-child(502)')

	const proxies = await page.evaluate(() => [...document.querySelectorAll('tr.spy1x > td:nth-child(1)'), ...document.querySelectorAll('tr.spy1xx > td:nth-child(1)')].map( el => { m=el.innerText.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{2,5})/); return m?m[1]:0}).filter(p => p))

	fs.writeFileSync('proxies.txt', proxies.join('\n'))
	await browser.close();
})();

//[...document.querySelectorAll('tr.spy1x > td:nth-child(1)'), ...document.querySelectorAll('tr.spy1xx > td:nth-child(1)')].map( el => { m=el.innerText.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{2,5})/); return m?m[1]:0}).filter(p => p)