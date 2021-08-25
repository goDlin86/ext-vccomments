const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

chrome.tabs.sendMessage(tab.id, { method: 'getHTML' }, (response) => {
    const container = document.querySelector('#comments')
    console.log(response.comments)

    const k = response.comments.length > 5 ? 5 : response.comments.length
    for (let index = 0; index < k; index++) {
        const item = response.comments[index]
        
        let html = '<div class="comment">'
        html += '<div><img class="user__image" src="' + item.img + '-/scale_crop/64x64/-/format/webp/"></div>'
        html += '<div><a class="user" href="' + item.userlink + '" target="_blank">' + item.username + '</a>'
        html += '<time>' + item.time + '</time></div>'
        html += '<div class="vote__value">' + item.votevalue + '</div>'
        html += '<div class="text">' + item.text + '</div>'
        if (item.media) html += '<img src="' + item.media + '-/preview/480/-/format/webp/">'
        html += '</div>'

        container.innerHTML += html
    }

})