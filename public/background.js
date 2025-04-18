function handlePreview(tab, targetUrl) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [targetUrl],
    func: (urlStr) => {
      const RE_GITLAB_PATH = /^\/[^/]+\/.+\/(-\/)?(blob|raw)\/[^/]+/;
      const RE_SOURCEHUT_PATH = /^\/~[^/]+\/[^/]+\/(tree|blob)\/[^/]+/;

      function extractForge(url) {
        let software = null;
        if (url.host === 'github.com' || url.host === 'raw.githubusercontent.com') {
          software = true;
        } else if (url.host === 'bitbucket.org' && /^\/[^/]+\/[^/]+\/(src|raw)\//.test(url.pathname)) {
          software = true;
        } else if (
          (url.host === 'gitlab.com' || url.host.endsWith('.gitlab.com')) &&
          RE_GITLAB_PATH.test(url.pathname)
        ) {
          software = true;
        } else if (url.host === 'codeberg.org' && /^\/[^/]+\/[^/]+\/(src|raw)\//.test(url.pathname)) {
          software = true;
        } else if (url.host === 'git.sr.ht' && RE_SOURCEHUT_PATH.test(url.pathname)) {
          software = true;
        }
        return software ? true : false;
      }

      const isGitForgeFileUrl = (urlStr) => {
        try {
          return extractForge(new URL(urlStr));
        } catch {
          return false;
        }
      };

      const isHtmlUrl = (url) => {
        return url.includes('.html') || url.includes('.htm');
      };

      return isGitForgeFileUrl(urlStr) && isHtmlUrl(urlStr) ? urlStr : null;
    },
  }).then((results) => {
    const validUrl = results[0].result;
    if (!validUrl) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => alert("This page is not supported by html-preview.")
      });
      return;
    }

    const previewUrl = `https://html-preview.github.io/?url=${encodeURIComponent(validUrl)}`;
    chrome.tabs.create({ url: previewUrl });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "preview-html",
    title: "Preview HTML",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  handlePreview(tab, info.pageUrl);
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "preview-html") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      handlePreview(tab, tab.url);
    });
  }
});