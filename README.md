<p align="center">
  <img src="public/icon/icon-48.png" alt="Glimpse Logo">
</p>

# 🔶👁️ Git Forge HTML Preview Web Extension

[![License: MIT](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen.svg)](https://developer.chrome.com/docs/extensions)

Git Forge HTML Preview lets you instantly render HTML files hosted on platforms like GitHub, GitLab, Bitbucket, and more.

Powered by the popular open source project, [html-preview/html-preview.github.io](https://github.com/html-preview/html-preview.github.io), it’s designed for developers, designers, and researchers working with static site generator such as Quarto.

## Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/I1QNETgFriM?si=-h5Er_xpMdG1Tp5t" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Features

This web extension redirects HTML files from Git forges like GitHub, GitLab, Bitbucket to the [html-preview.github.io](https://html-preview.github.io/) without needing to open the website manually.

You can open the preview in three ways:
– **via a keyboard shortcut.** (Alt+P or Option+P) It is configurable via `chrome://extensions/shortcuts`
– from the **right-click context menu**
– or **using a 'Preview' button on GitHub**.

## Inspiration

#todo

## Installation

You can install this web extension directly from the [Chrome Web Store]().

### Local Installation

If you want to install the extension locally, follow these steps:

1. Clone or download this repo
2. Go to `chrome://extensions`
3. Enable Developer Mode
4. Click Load unpacked
5. Select the `public` folder in the cloned repo
6. The extension should now be installed and ready to use!

## Contributing

This extension is built primarily for Github. For example, the `Preview` button is only available for github.

However, it already support other Git forges like GitLab and Bitbucket via context menu and shortcut keys. If you want to contribute to support UI element for other Git forges, please feel free to fork this repo and create a pull request.
