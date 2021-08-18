const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

chrome.tabs.sendMessage(tab.id, { method: 'getHTML' }, (response) => {

    console.log(response)
    console.log('new')
    
})