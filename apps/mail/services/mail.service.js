import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'

const email = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}

const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query
}

function query() {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            return mails
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(email)
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}