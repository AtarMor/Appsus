import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'

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
    save,
    getUnreadMails,
    getUserMail,
    deleteMail
}

function query(filterBy, sortBy) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.stat) {
                if (filterBy.stat === 'inbox') mails = mails.filter(mail =>
                    mail.removedAt === null && mail.to === loggedInUser.email)
                else if (filterBy.stat === 'sent') mails = mails.filter(mail =>
                    mail.from === loggedInUser.email && mail.sentAt)
                else if (filterBy.stat === 'trash') mails = mails.filter(mail => mail.removedAt)
                else if (filterBy.stat === 'draft') mails = mails.filter(mail => !mail.sentAt)
                else if (filterBy.stat === 'starred') mails = mails.filter(mail => mail.isStarred)
            }
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body) ||
                    regex.test(mail.from) || regex.test(mail.to))
            }
            if (filterBy.isRead !== undefined) {
                filterBy.isRead ? mails.filter(mail => mail.isRead) : mails.filter(mail => !mail.isRead)
            }
            if (sortBy.type === 'date') mails.sort((mail1, mail2) => (mail1.sentAt - mail2.sentAt) * sortBy.dir)
            if (sortBy.type === 'subject') mails.sort((mail1, mail2) => (mail1.subject.localeCompare(mail2.subject)) * sortBy.dir)
            if (sortBy.type === 'from') mails.sort((mail1, mail2) => (mail1.from.localeCompare(mail2.from)) * sortBy.dir)
            if (sortBy.type === 'to') mails.sort((mail1, mail2) => (mail1.to.localeCompare(mail2.to)) * sortBy.dir)

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

function getUnreadMails() {  //unread in inbox 
    return storageService.query(MAIL_KEY)
        .then(mails => mails.filter(mail =>
            !mail.isRead &&
            mail.removedAt === null &&
            mail.to === loggedInUser.email))
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function getUserMail() {
    return loggedInUser.email
}

function remove(mail) {
    const UpdatedMail = { ...mail, removedAt: Date.now() }
    return storageService.put(MAIL_KEY, UpdatedMail)
}

function deleteMail(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function update(mail) {
    return storageService.put(MAIL_KEY, mail)
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
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

function _getDefaultFilter() {
    return { stat: 'inbox', txt: '' }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        for (let i = 0; i <= 30; i++) {
            mails.push(_createMail())
        }
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail() {
    const randTo = _getRandTo()
    return {
        id: utilService.makeId(),
        subject: utilService.makeLorem(5),
        body: utilService.makeLorem(50),
        isRead: Math.random() < 0.5,
        isStarred: Math.random() < 0.3,
        sentAt: _getRandSentAt(randTo),
        removedAt: _getRandRemovedAt(),
        from: _getRandFrom(randTo),
        to: randTo,
    }
}

function _getRandSentAt(randTo) {
    return randTo === loggedInUser.email || Math.random() > 0.5 ? utilService.makeRandTimestamp() : null
}

function _getRandRemovedAt() {
    return Math.random() < 0.3 ? utilService.makeRandTimestamp() : null
}

function _getRandTo() {
    return Math.random() < 0.4 ? utilService.makeRandMail() : loggedInUser.email
}

function _getRandFrom(randTo) {
    return randTo === loggedInUser.email ? utilService.makeRandMail() : loggedInUser.email
}