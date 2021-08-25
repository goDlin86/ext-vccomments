chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'getHTML') {
        const items = [...document.querySelector('.comments__content').querySelectorAll('.comments__item')]
        const data = items.reduce((result, item) => {
            if (item.querySelector('.comments__item__user__image, .comments__item__avatar > .andropov_image'))
                result.push({
                    id: item.getAttribute('data-id'),
                    date: item.getAttribute('data-date'),
                    userid: item.getAttribute('data-user_id'),
                    rating: item.getAttribute('data-rating'),
                    replyto: item.getAttribute('data-reply_to'),
                    text: item.querySelector('.comments__item__text').innerHTML,
                    img: item.querySelector('.comments__item__user__image, .comments__item__avatar > .andropov_image').getAttribute('data-image-src'),
                    username: item.querySelector('.user_name').innerText,
                    userlink: item.querySelector('.comments__item__user').getAttribute('href'),
                    time: item.querySelector('time').innerText,
                    votevalue: item.querySelector('.vote__value__v').innerText,
                    media: 
                        item.querySelector('.comments__item__space').querySelector('.comments__item__media > .andropov_image') ? 
                        item.querySelector('.comments__item__space').querySelector('.comments__item__media > .andropov_image').getAttribute('data-image-src') : null
                })
            
            return result
        }, [])

        sendResponse({ comments: data.sort((a, b) => b.votevalue - a.votevalue) })
    }
})