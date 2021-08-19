chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'getHTML') {
        const items = [...document.querySelector('.comments__content').querySelectorAll('.comments__item')]
        const data = items.map(item => {
            if (item.querySelector('.comments__item__user__image'))
                return {
                    id: item.getAttribute('data-id'),
                    date: item.getAttribute('data-date'),
                    userid: item.getAttribute('data-user_id'),
                    rating: item.getAttribute('data-rating'),
                    replyto: item.getAttribute('data-reply_to'),
                    text: item.querySelector('.comments__item__text').innerHTML,
                    img: item.querySelector('.comments__item__user__image').getAttribute('src'),
                    username: item.querySelector('.user_name').innerText,
                    userlink: item.querySelector('.comments__item__user').getAttribute('href'),
                    time: item.querySelector('time').innerText,
                    votevalue: item.querySelector('.vote__value__v').innerText,
                    media: item.querySelector('.comments__item__media') ? item.querySelector('.comments__item__media').querySelector('img').outerHTML : null
                }
        })

        sendResponse({ comments: data.sort((a, b) => b.votevalue - a.votevalue) })
    }
})