const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

chrome.tabs.sendMessage(tab.id, { method: 'getComments' }, (response) => {
    const container = document.querySelector('#comments')
    container.innerHTML = '<h1>' + response.title + '</h1>'

    console.log(response.comments)

    response.comments.map(item => {        
        let html = '<div class="comment" style="margin-left:' + (item.level*40) + 'px">'
        html += '<div><img class="user__image" src="' + item.img + '-/scale_crop/64x64/-/format/webp/"></div>'
        html += '<div><a class="user" href="' + item.userlink + '" target="_blank">' + item.username + '</a>'
        html += '<time>' + item.time + '</time></div>'
        html += '<div class="vote__value ' + (item.votevalue > 0 ? 'plus' : 'minus') + '"><span>' + item.votevalue + '</span></div>'
        html += '<div class="text">' + item.text + '</div>'
        if (item.image) html += '<img src="' + item.image + '-/preview/480/-/format/webp/">'
        if (item.video) html += '<video autoplay="" loop="" playsinline="" muted=""><source src="' + item.video + '" type="video/mp4"></video>'
        html += '</div>'

        container.innerHTML += html
    })

})