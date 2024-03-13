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
    remove,
    getFilterFromParams
}

// function query(filterBy) {
//     return storageService.query(MAIL_KEY)
//         .then(mails => mails.filter(mail => mail.removedAt === null))
//         .then(mails => {


//             return mails
//         })
// }
function query(filterBy) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.stat) {
                if (filterBy.stat === 'inbox') mails.filter(mail =>
                    mail.removedAt === null && mail.from !== loggedInUser.email)
                else if (filterBy.stat === 'sent') mails.filter(mail =>
                    mail.from !== loggedInUser.email)
                else if (filterBy.stat === 'trash') mails.filter(mail => mail.removedAt)
                else if (filterBy.stat === 'draft') mails.filter(mail => mail.sentAt)
            }
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body))
            }
            if (filterBy.isRead !== undefined) {
                filterBy.isRead ? mails.filter(mail => mail.isRead) : mails.filter(mail => !mail.isRead)
            }
            // if (filterBy.isStared !== undefined) {
            //     filterBy.isStared ? mails.filter(mail => mail.isStared) : mails.filter(mail => !mail.isStared)
            // }
            return mails
        })
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = _getDefaultFilter()
    return {
        stat: searchParams.get('stat') || defaultFilter.stat,
        txt: searchParams.get('txt') || defaultFilter.txt
    }
}

function _getDefaultFilter() {
    return { stat: '', txt: '' }
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mail) {
    const UpdatedMail = { ...mail, removedAt: Date.now() }
    return storageService.put(MAIL_KEY, UpdatedMail)
}

const criteria = {
    stat: 'inbox/sent/trash/draft',
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