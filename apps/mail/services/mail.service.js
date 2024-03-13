import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'

const emails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStarred: true,
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
        isStarred: false,
        sentAt: null,
        removedAt: null,
        from: 'pooo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e103',
        subject: 'Call me!',
        body: 'Hi! how are you?',
        isRead: true,
        isStarred: true,
        sentAt: null,
        removedAt: null,
        from: 'comc@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e104',
        subject: 'Call me!',
        body: 'Hi!!!!',
        isRead: true,
        isStarred: false,
        sentAt: 1551133930194,
        removedAt: 1551133930194,
        from: 'user@appsus.com',
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
    getFilterFromParams,
    update,
    getEmptyMail,
    save
}

function query(filterBy) {
    console.log('filterBy:', filterBy)
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.stat) {
                console.log('filterBy.stat:', filterBy.stat)
                if (filterBy.stat === 'inbox') mails = mails.filter(mail =>
                    mail.removedAt === null && mail.to === loggedInUser.email)
                else if (filterBy.stat === 'sent') mails = mails.filter(mail =>
                    mail.from === loggedInUser.email)
                else if (filterBy.stat === 'trash') mails = mails.filter(mail => mail.removedAt)
                else if (filterBy.stat === 'draft') mails = mails.filter(mail => !mail.sentAt)
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
            console.log('mails:', mails)
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

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mail) {
    const UpdatedMail = { ...mail, removedAt: Date.now() }
    return storageService.put(MAIL_KEY, UpdatedMail)
}

function update(mail) {
    return storageService.put(MAIL_KEY, mail)
}

function getEmptyMail(){
    return {
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: loggedInUser.email,
        to: ''
    }
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

const criteria = {
    stat: 'inbox/sent/trash/draft',
    txt: 'puki',
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    labels: ['important', 'romantic']
}

function _getDefaultFilter() {
    return { stat: '', txt: '' }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = emails
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}