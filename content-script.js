chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'getComments') {
        const title = document.querySelector('.content-title').innerText ?? ''
        const commentsEl = document.querySelector('.comments__content_wrapper') ?? document.querySelector('.comments__tree')
        const items = [...commentsEl.querySelectorAll('.comment')]
        const data = items.reduce((result, item) => {
            if (item.querySelector('.comment__author'))
                result.push({
                    id: item.getAttribute('data-id'),
                    replyto: item.getAttribute('data-reply_to'),
                    text: item.querySelector('.comment__text') ? item.querySelector('.comment__text').innerHTML : '',
                    img: item.querySelector('.comment__avatar__image > .andropov_image') ? 
                        item.querySelector('.comment__avatar__image > .andropov_image').getAttribute('data-image-src') : 
                        item.querySelector('.comment__avatar__image > .subsite-video-avatar > img').getAttribute('src'),
                    username: item.querySelector('.comment__author').innerText,
                    userlink: item.querySelector('.comment__author').getAttribute('href'),
                    isAuthor: item.querySelector('.comment__detail--author') !== null,
                    isVerified: item.querySelector('.comment__verified-badge') !== null,
                    time: item.querySelector('time').innerText,
                    votevalue: parseInt(item.querySelector('.like-button').innerText),
                    image: [...item.querySelectorAll('.comment__media .andropov_image')].map(el => el.getAttribute('data-image-src')) ?? null,
                    video: [...item.querySelectorAll('.comment__media .andropov_video')].map(el => el.getAttribute('data-video-iframe') ?? el.getAttribute('data-video-mp4')) ?? null
                })
            else if (item.querySelector('.author')) // new dtf
                result.push({
                    id: item.querySelector('.comment__detail').getAttribute('href').slice(-8),
                    replyto: item.querySelector('[data-branch-id]') ? item.querySelector('[data-branch-id]').getAttribute('data-branch-id') : '0',
                    text: item.querySelector('.comment__text') ? item.querySelector('.comment__text').innerHTML : '',
                    img: item.querySelector('.andropov-media > img').getAttribute('src'),
                    username: item.querySelector('.author__name').innerText,
                    userlink: item.querySelector('.author__name').getAttribute('href'),
                    isAuthor: item.querySelector('.comment__detail--accent') !== null,
                    isVerified: item.querySelector('.comment__verified-badge') !== null, //todo
                    time: item.querySelector('span').innerText,
                    votevalue: parseInt(item.querySelector('.like__count') ? item.querySelector('.like__count').innerText : 0),
                    image: [...item.querySelectorAll('.comment-media .andropov-image > img')].map(el => el.getAttribute('src')) ?? null,
                    video: [...item.querySelectorAll('.comment-media .andropov-external-video')].map(el => el.getAttribute('data-video-iframe') ?? el.getAttribute('data-video-mp4')) ?? null
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
            if (parentEl) {
                if (el.display) parentEl.display = true
                parentEl.children = [...(parentEl.children || []), el]
            }
        })

        sendResponse({ title, comments })
    }
})