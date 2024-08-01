import * as async from 'async';
import { launch } from 'puppeteer';

export interface Navigation {
  url: URL;
  query_params: URLSearchParams;
}

export class Xss {
  async scan(urls: Navigation[], payloads: string[]) {
    await async.forEachSeries(payloads, async (payload: string) => {
      await async.forEachSeries(urls, async ({ url }) => {
        const browser = await launch();
        const context = await browser.createBrowserContext();
        const page = await context.newPage();

        try {
          console.log(`scanning ${url} | payload ${payload}`);

          page.on('dialog', async (dialog) => {
            console.log('Found Vulnerability: ', dialog.message());
            await dialog.dismiss();
          });

          page.on('error', console.error);
          url.searchParams.append('query', payload);

          await page.goto(url.toString(), {
            timeout: 20000,
            waitUntil: 'networkidle2',
          });

          await page.waitForFunction(() => document.readyState === 'complete', {
            timeout: 20000,
          });
        } catch (e) {
          console.error(`Error processing ${url.toString()}:`, e); // Log specific URL
        } finally {
          await page.close();
          await browser.close();
          console.log(`scanning ${url} | payload ${payload} completed`);
        }
      });
    });
  }
}
