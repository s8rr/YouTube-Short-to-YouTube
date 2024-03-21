chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "openLegacyPlayer",
    title: "Open in Legacy Player",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "openLegacyPlayer") {
    var url = tab.url;
    var videoCode = extractVideoCode(url);
    if (videoCode) {
      var newUrl = 'https://www.youtube.com/watch?v=' + videoCode;
      chrome.tabs.create({url: newUrl});
    } else {
      alert('No valid video code found in the URL.');
    }
  }
});

function extractVideoCode(url) {
  var match = url.match(/\/([a-zA-Z0-9_-]+)$/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}
