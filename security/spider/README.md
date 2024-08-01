# @hive-o/spider 🕷️

A simple, fast web crawling and navigation library built with Puppeteer, designed to automate interactions with websites, explore links, and gather information.

<p align="center">
<a href="https://www.npmjs.com/package/@hive-o/spider"><img src="https://img.shields.io/npm/v/@hive-o/spider.svg?style=flat" alt="version" /></a>
<a href="https://www.npmjs.com/package/@hive-o/spider"><img alt="downloads" src="https://img.shields.io/npm/dt/@hive-o/spider.svg?style=flat" /></a>
<img alt="license" src="https://img.shields.io/npm/l/@hive-o/spider.svg" />
</p>

## Installation

```shell
# npm
npm install @hive-o/spider

# yarn
yarn add @hive-o/spider
```

## Features

* **Simplified Crawling**: Easily crawl websites by clicking buttons, following links, and exploring different paths.
* **Navigation Management**: Intelligently track visited URLs, avoiding duplicate crawls and managing navigation history.
* **Puppeteer Integration**: Seamlessly integrates with Puppeteer for browser automation and control.
* **Modularity**: Separate classes for browser management, navigation tracking, and crawling logic for better organization and reusability.
* **Customizable**: Easily extend and adapt the crawler's behavior to your specific needs.

```typescript
import { Spider, Navigation } from '@hive-o/spider';

async function main() {
  const spider = new Spider();
  await spider.start(['https://www.example.com', 'https://www.othersite.com']);

  const navigation = Navigation.instance();
  navigation.forEach((domainEntry) => {
    console.log(`Domain: ${domainEntry.domain}`);
    domainEntry.routes.forEach((routeEntry, path) => {
      console.log(`  Path: ${path}`);
      console.log(`  Query Params: ${routeEntry.query_params.toString()}`);
    });
  });
  
}

main();
```

## Classes

* BrowserManager: Singleton class for managing the browser lifecycle and context.
  * Methods include:
    * launchBrowser()
    * newPage()
    * closeBrowser()
* Navigation: Singleton class for tracking navigation history.
  * Methods include:
    * get(url)
    * set(url)
    * has(url)
    * entries()
    * forEach(callback)
* Crawler: The core crawling class.
  * Methods include:
    * start(initialUrls)
    * crawl(address, context) (private)
    * recordNavigations(page) (private)

## Customization

* **Event Handling**: Attach event listeners to the Page object within the crawl method to handle specific events like navigation, dialogs, errors, etc.
* **Input Manipulation**: Override or extend the recordNavigations method to add logic for filling out forms or interacting with input elements.
* **Data Extraction**: Add custom functions to extract relevant data from the pages visited by the crawler.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.
