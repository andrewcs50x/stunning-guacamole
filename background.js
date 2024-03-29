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
    if (info.menuItemId === "openLinkedInPeople" && isValidLinkedInUrl(info.linkUrl)) {
        const newUrl = info.linkUrl.replace(/\/(life.*)?$/, "/people");
        
        // Calculate the position for the new tab
        const newIndex = tab.index + 1;

        chrome.tabs.create({ url: newUrl, index: newIndex }, newTab => {
            // Check if the original tab is part of a group
            if (tab.groupId !== -1) {
                // Add the new tab to the same group as the originating tab
                chrome.tabs.group({ groupId: tab.groupId, tabIds: newTab.id });
            }
        });
    }
});


// Function to check if the URL is a valid LinkedIn domain
function isValidLinkedInUrl(url) {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
        
        // Check if the hostname is exactly 'linkedin.com' or ends with '.linkedin.com'
        if (hostname === "linkedin.com" || hostname.endsWith(".linkedin.com")) {
            return true;
        }
    } catch (error) {
        console.error("Error parsing URL: ", error);
    }
    return false;
}
