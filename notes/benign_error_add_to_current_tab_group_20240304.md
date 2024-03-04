The error message "Uncaught (in promise) Error: Saved groups are not editable." suggests that there's an attempt to modify a tab group that Chrome considers "saved" or otherwise in a state that cannot be programmatically altered through the Extensions API. This could be due to several reasons, such as trying to modify a group that has been persisted across browser sessions in a way that Chrome doesn't allow to be altered through extension scripts.

Since the Chrome Extensions API's documentation doesn't explicitly define the constraints around "saved" groups or their editability, this behavior might be part of Chrome's internal management of tab groups that isn't fully exposed or documented for developers. Chrome might impose restrictions on modifying certain properties of tab groups that it considers "saved" or managed in a special way, possibly for consistency or data integrity reasons across sessions.

### Possible Workarounds:

1. **Check Group Editability Before Modifying**: Before attempting to add a tab to a group, you could check if the operation is likely to succeed or if the group is in a state that might prevent editing. However, without specific properties or methods to check this directly, this approach might be limited to catching errors and reacting accordingly, as you're already encountering.

2. **Error Handling**: Given that the error emerges as a promise rejection, ensure you're using proper error handling when calling `chrome.tabs.group`. This can be achieved by using `.catch()` with promises or `try...catch` with async/await to gracefully handle the error without causing uncaught exceptions in your background script.

   ```javascript
   chrome.tabs.create({ url: newUrl, index: newIndex }, newTab => {
       if (tab.groupId !== -1) {
           chrome.tabs.group({ groupId: tab.groupId, tabIds: newTab.id }).catch(error => {
               console.error("Error adding tab to group:", error.message);
               // Handle the error or notify the user as appropriate
           });
       }
   });
   ```

3. **User Feedback**: If the extension frequently encounters situations where it cannot modify tab groups as intended, consider providing feedback to the user. This could involve notifying them that the operation isn't possible due to browser restrictions, possibly through the extension's UI or a notification.

4. **Review and Feedback to Chrome Developers**: Since this behavior might reflect limitations or specific design choices in the Chrome Extensions API regarding tab groups, consider providing feedback or seeking clarification from the Chrome Developers through forums or issue trackers. There might be updates, additional context, or workarounds provided by the Chrome development team or community.

### Long-Term Consideration:
Monitor for updates or changes to the Chrome Extensions API documentation and community forums. Chrome's handling of tab groups and the associated API might evolve, potentially offering more flexibility or clearer guidelines on managing "saved" groups in future versions.