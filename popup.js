document.addEventListener('DOMContentLoaded', function() {
  var extractButton = document.getElementById('extractButton');

  extractButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var url = tabs[0].url;
      var videoCode = extractVideoCode(url);
      if (videoCode) {
        var newUrl = 'https://www.youtube.com/watch?v=' + videoCode;
        chrome.tabs.create({url: newUrl});
      } else {
        alert('No valid video code found in the URL.');
      }
    });
  });

  function extractVideoCode(url) {
    var match = url.match(/\/([a-zA-Z0-9_-]+)$/);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }
});
