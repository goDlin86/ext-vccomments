chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'getHTML') {
        

        sendResponse({ data: document.querySelector('.comments__content').outerHTML })
    }
})