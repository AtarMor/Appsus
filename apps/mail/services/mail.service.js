import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'

const emails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        subject: 'Love you!',
        body: 'Would love to meet',
        isRead: false,
        sentAt: 1551133930524,
        removedAt: null,
        from: 'pooo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e103',
        subject: 'Call me!',
        body: 'Hi! how are you?',
        isRead: true,
        sentAt: 1551133930194,
        removedAt: null,
        from: 'comc@momo.com',
        to: 'user@appsus.com'
    },
]

const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    get,
    remove
}

function query() {
    return storageService.query(MAIL_KEY)
        .then(mails => mails.filter(mail => mail.removedAt === null ))
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mail) {
    const UpdatedMail = {...mail, removedAt: Date.now()}
    return storageService.put(MAIL_KEY, UpdatedMail)
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki',
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    labels: ['important', 'romantic']
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = emails
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}