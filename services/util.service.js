export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    loadFromStorage,
    saveToStorage,
    makeRandMail,
    makeRandTimestamp,
    getFormattedDate
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people.', 'and', 'as generally', 'happens', 'in such cases.', 'each time', 'it', 'was', 'a different story.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getFormattedDate(timeStamp) {
    const psTime = new Date(timeStamp)
    const now = Date.now()
    const yesterday = now - 24 * 60 * 60 * 1000
    const currYear = new Date(2024,0,1).getTime()

    if (timeStamp > yesterday) return psTime.getHours() + ':' + String(psTime.getMinutes()).padStart(2, '0')

    if (timeStamp > currYear) {
        return psTime.getDate() + ' ' + utilService.getMonthName(psTime).substring(0, 3)
    }
    return psTime.toLocaleDateString('en-IL')
}

function makeRandMail() {
    let mails = ['atar@gmail.com', 'ariel@gmail.com', 'tom@gmail.com', 'gal@gmail.com']
    return mails[getRandomIntInclusive(0, mails.length - 1)]
}

function makeRandTimestamp(start = new Date(2023, 9, 1).getTime(), end = new Date()) {
    if (Math.random() < 0.2) start = new Date().setHours(0, 0, 0, 0)
    return start + Math.random() * (end.getTime() - start)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["Jan", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}