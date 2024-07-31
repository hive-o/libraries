# @hive-o/security-xss 🕷️

A powerful web crawling and navigation library built with Puppeteer, designed to automate interactions with websites, explore links, and gather information.

<p align="center">
<a href="https://www.npmjs.com/package/@hive-o/security-xss"><img src="https://img.shields.io/npm/v/@hive-o/security-xss.svg?style=flat" alt="version" /></a>
<a href="https://www.npmjs.com/package/@hive-o/security-xss"><img alt="downloads" src="https://img.shields.io/npm/dt/@hive-o/security-xss.svg?style=flat" /></a>
<img alt="license" src="https://img.shields.io/npm/l/@hive-o/security-xss.svg" />
</p>

## Installation

```shell
# npm
npm install @hive-o/security-xss

# yarn
yarn add @hive-o/security-xss
```

## Usage

```typescript
import { Xss } from '@hive-o/security-xss';

async function main() {
  const xss = new xss();
  await xss.scan(['https://www.example.com']);
}

main();
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.
