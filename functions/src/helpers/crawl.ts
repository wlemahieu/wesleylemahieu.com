import puppeteer, { PuppeteerLifeCycleEvent } from 'puppeteer';

const normalize = (text: string | null) => text || '';

export default async function crawl () {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  const options = { waitUntil: 'domcontentloaded' as PuppeteerLifeCycleEvent };
  await page.goto('https://stackoverflow.com/users/904956/wesley-lemahieu', options);
  const selector = '.flex__allitems6 > div';
  // console.log(`Waiting for '${selector}' selector...`);
  await page.waitForSelector(selector, { visible: true, timeout: 20000 });
  // console.log('Selector found!');
  const items = await page.$$eval(selector, items => items.map(item => item.textContent));
  await browser.close();
  const cleaned = items.map((i) => normalize(i));
  const reputation = cleaned[0].split('reputation')[0].trim();
  const reached = cleaned[1].split('reached')[0].trim();
  const answers = cleaned[2].split('answers')[0].trim();
  const questions = cleaned[3].split('questions')[0].trim();
  const achievement = cleaned[4].trim();
  const data = { reputation, reached, answers, questions, achievement };
  return Promise.resolve(data);
}