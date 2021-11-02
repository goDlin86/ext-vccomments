chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'getComments') {
        const title = document.querySelector('.content-title') ? document.querySelector('.content-title').innerText : ''
        const items = [...document.querySelector('.comments__content').querySelectorAll('.comment')]
        const data = items.reduce((result, item) => {
            if (item.querySelector('.comment__avatar .andropov_image'))
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
                    votevalue: parseFloat(item.querySelector('.vote__value__v').innerText),
                    image: 
                        item.querySelector('.comment__space').querySelector('.comment__media .andropov_image') ? 
                        [...item.querySelector('.comment__space').querySelectorAll('.comment__media .andropov_image')].map(el => el.getAttribute('data-image-src')) : null,
                    video: 
                        item.querySelector('.comment__space').querySelector('.comment__media .andropov_video') ? 
                        [...item.querySelector('.comment__space').querySelectorAll('.comment__media .andropov_video')].map(el => el.getAttribute('data-video-mp4')) : null
                })
            
            return result
        }, [])

        const sorted = data.sort((a, b) => b.votevalue - a.votevalue)
        const minValue = sorted[7] ? sorted[7].votevalue : sorted[sorted.length - 1].votevalue

        let comments = []
        data.forEach(el => {
            el.display = el.votevalue >= minValue

            if (el.replyto === '0') {
                comments.push(el)
                return
            }

            const parentEl = data.find(c => c.id === el.replyto)
            if (el.display) parentEl.display = true
            parentEl.children = [...(parentEl.children || []), el]
        })

        sendResponse({ title, comments })
    }
})