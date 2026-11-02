// Content script (runs in the context of the page)
// You can modify this to include other functionality like sending text selections to Discord

// Optional: Modify this to customize what is sent to Discord
const contextMenuItems = [
    { id: "sendImage", title: "Send Image to Discord", contexts: ["image"] },
    { id: "sendLink", title: "Send Link to Discord", contexts: ["link"] }
  ];
  
  // Create context menu items
  for (const item of contextMenuItems) {
    chrome.contextMenus.create(item);
  }
  
  // Handle click events on context menu items
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case "sendImage":
      case "sendLink":
        sendMessage(info.srcUrl || info.linkUrl);
        break;
      default:
        break;
    }
  });
  
  // Function to send message to Discord webhook
  function sendMessage(content) {
    // Replace 'YOUR_WEBHOOK_URL' with your actual webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1219358578931142767/FbsIYK2YynLBozg_wLgsWOHbFuHbsgw5vczLYvxj3sQTpT1tusgkpIO2Ukk9s1dVfeWZ';
  
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })
    .then(response => {
      if (!response.ok) {
        console.error('Error sending message to Discord:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error sending message to Discord:', error.message);
    });
  }
  