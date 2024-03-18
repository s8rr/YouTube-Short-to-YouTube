document.addEventListener('DOMContentLoaded', function() { // Made By Sabbir 
  var extractButton = document.getElementById('extractButton');
// Made By Sabbir 
  extractButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var url = tabs[0].url; // Made By Sabbir 
      var videoCode = extractVideoCode(url);
      if (videoCode) { // Made By Sabbir 
        var newUrl = 'https://www.youtube.com/watch?v=' + videoCode;
        chrome.tabs.create({url: newUrl});
      } else {
        alert('No valid video code found in the URL.');
      }
    });
  });
// Made By Sabbir 
  function extractVideoCode(url) {// Made By Sabbir 
    var match = url.match(/\/([a-zA-Z0-9_-]+)$/);
    if (match && match[1]) {
      return match[1];
    }// Made By Sabbir 
    return null;
  }// Made By Sabbir 
});
