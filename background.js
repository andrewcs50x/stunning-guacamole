chrome.runtime.onInstalled.addListener(function() {
    // First, try to remove the context menu item if it exists
    chrome.contextMenus.remove("openLinkedInPeople", () => {
        // Check for any errors, which would indicate the item didn't exist
        if (chrome.runtime.lastError) {
            console.log("Context menu item does not exist:", chrome.runtime.lastError.message);
        }

        // Create the context menu item
        chrome.contextMenus.create({
          id: "openLinkedInPeople",
          title: "Open LinkedIn 'People' Page",
          contexts: ["link"],
          documentUrlPatterns: ["*://*.linkedin.com/*"]
        });
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openLinkedInPeople" && info.linkUrl.includes('linkedin.com')) {
      const newUrl = info.linkUrl.replace(/\/(life.*)?$/, "/people");
      chrome.tabs.create({ url: newUrl });
    }
});