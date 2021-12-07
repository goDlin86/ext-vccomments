chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'getComments') {
        const title = document.querySelector('.content-title') ? document.querySelector('.content-title').innerText : ''
        const items = [...document.querySelector('.comments__content_wrapper').querySelectorAll('.comment')]
        const data = items.reduce((result, item) => {
            if (item.querySelector('.comment__author'))
                result.push({
                    id: item.getAttribute('data-id'),
                    date: item.getAttribute('data-date'),
                    userid: item.getAttribute('data-user_id'),
                    rating: item.getAttribute('data-rating'),
                    replyto: item.getAttribute('data-reply_to'),
                    text: item.querySelector('.comment__text') ? item.querySelector('.comment__text').innerHTML : '',
                    img: item.querySelector('.comment__avatar').getAttribute('style').substring(23, 87),
                    username: item.querySelector('.comment__author').innerText,
                    userlink: item.querySelector('.comment__author').getAttribute('href'),
                    time: item.querySelector('time').innerText,
                    votevalue: parseInt(item.querySelector('.vote__value').innerText.replace('–','-'), 10),
                    image: 
                        item.querySelector('.comment__media .andropov_image') ? 
                        [...item.querySelectorAll('.comment__media .andropov_image')].map(el => el.getAttribute('data-image-src')) : null,
                    video: 
                        item.querySelector('.comment__media .andropov_video') ? 
                        [...item.querySelectorAll('.comment__media .andropov_video')].map(el => el.getAttribute('data-video-mp4')) : null
                })
            
            return result
        }, [])

        const sorted = data.sort((a, b) => b.votevalue - a.votevalue)
        const minValue = sorted[7] ? sorted[7].votevalue : sorted.length > 0 ? sorted[sorted.length - 1].votevalue : 0

        let comments = []
        data.forEach(el => {
            if (!el.display) el.display = el.votevalue >= minValue && el.votevalue > 0

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