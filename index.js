const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

chrome.tabs.sendMessage(tab.id, { method: 'getComments' }, (response) => {
    const container = document.querySelector('#comments')
    container.innerHTML = '<h1>' + response.title + '</h1>'

    console.log(response.comments)

    response.comments.map(item => {        
        container.innerHTML += commentHTML(item)
    })

})

const commentHTML = (item) => {
    let html = ''
    if (item.display) {
        html = '<div class="comment">'
        html += '<div><img class="user__image" src="' + item.img + '-/scale_crop/64x64/-/format/webp/"></div>'
        html += '<div><a class="user" href="' + item.userlink + '" target="_blank">' + item.username + (item.isVerified ? ' <svg class="icon" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#ui_verified"></use></svg>' : '') + '</a>'
        html += '<time>' + item.time + '</time>' + (item.isAuthor ? '<span class="author">Автор</span>' : '') + '</div>'
        html += '<div class="vote__value ' + (item.votevalue > 0 ? 'plus' : 'minus') + '"><span>' + item.votevalue + '</span></div>'
        html += '<div class="text">' + item.text
        if (item.image) 
            item.image.map(image => html += '<img src="' + image + '-/preview/480/-/format/webp/" />')
        if (item.video) 
            item.video.map(video => 
                html += video.includes('https://www.youtube.com') ? 
                    '<iframe width="360" height="240" src="' + video + '" frameborder="0" allow="autoplay; clipboard-write; encrypted-media" allowfullscreen></iframe>' : 
                    '<video autoplay="" loop="" playsinline="" muted=""><source src="' + video + '" type="video/mp4"></video>'
            )
        html += '</div></div>'

        if (item.children) {
            html += '<div class="children">'
            item.children.map(child => html += commentHTML(child))
            html += '</div>'
        }
    }

    return html
}