const puppeteer = require('puppeteer');

const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(Stealth());

(async () => {

  // this can be used if you want to run as headless browser and avoid captcha
  // Launch the browser and open a new blank page
  const browser = await puppeteerExtra.launch();
  const page = await browser.newPage();

  // this can be used if you want to run as full browser, this gets captcha
  // Launch the browser and open a new blank page
  // const browser = await puppeteer.launch({headless: false});
  // const page = await browser.newPage();


  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});


  // Navigate the page to a URL
  await page.goto('https://nahlizenidokn.cuzk.cz/VyberParcelu/Parcela/InformaceO');

  // Type into search box
  await page.type('#ctl00_bodyPlaceHolder_vyberObecKU_vyberKU_txtKU', '727181');

  // Wait and click on first result
  const searchResultSelector = '#ctl00_bodyPlaceHolder_vyberObecKU_vyberKU_btnKU';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Fill text box
  await page.type('#ctl00_bodyPlaceHolder_txtParcis', '1930');

  // Click on next button
  const searchResultSelector2 = '#ctl00_bodyPlaceHolder_btnVyhledat';
  await page.waitForSelector(searchResultSelector2);
  await page.click(searchResultSelector2);


  // Can locate specific elements as needed
  // const element = await page.waitForSelector('#main--content');
  // const value = await element.evaluate(el => el.textContent);

  // Print the full title
  const html = await page.content();
  console.log(html);

  await browser.close();
})();