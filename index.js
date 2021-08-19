const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

chrome.tabs.sendMessage(tab.id, { method: 'getHTML' }, (response) => {
    const container = document.querySelector('#comments')

    for (let index = 0; index < 5; index++) {
        const item = response.comments[index]
        
        let html = '<div class="comment">'
        html += '<div><img class="user__image" src="' + item.img + '"></div>'
        html += '<div><a class="user" href="' + item.userlink + '" target="_blank"><div>' + item.username + '</div>'
        html += '<time>' + item.time + '</time></a></div>'
        html += '<div class="vote__value">' + item.votevalue + '</div>'
        html += '<div class="text">' + item.text + '</div>'
        if (item.media) html += item.media
        html += '</div>'

        container.innerHTML += html
    }

})