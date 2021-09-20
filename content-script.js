chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'getComments') {
        const title = document.querySelector('.content-title').innerText
        const items = [...document.querySelector('.comments__content').querySelectorAll('.comment')]
        const data = items.reduce((result, item) => {
            if (item.querySelector('.comment__avatar > .andropov_image'))
                result.push({
                    id: item.getAttribute('data-id'),
                    date: item.getAttribute('data-date'),
                    userid: item.getAttribute('data-user_id'),
                    rating: item.getAttribute('data-rating'),
                    replyto: item.getAttribute('data-reply_to'),
                    text: item.querySelector('.comment__text').innerHTML,
                    img: item.querySelector('.comment__avatar > .andropov_image').getAttribute('data-image-src'),
                    username: item.querySelector('.comment-user__name').innerText,
                    userlink: item.querySelector('.comment-user').getAttribute('href'),
                    time: item.querySelector('time').innerText,
                    votevalue: item.querySelector('.vote__value__v').innerText,
                    media: 
                        item.querySelector('.comment__space').querySelector('.comment__media > .andropov_image') ? 
                        item.querySelector('.comment__space').querySelector('.comment__media > .andropov_image').getAttribute('data-image-src') : null
                })
            
            return result
        }, [])

        const comments = data.sort((a, b) => parseFloat(b.votevalue) - parseFloat(a.votevalue))

        sendResponse({ title, comments })
    }
})