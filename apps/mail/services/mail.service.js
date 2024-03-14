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
    save
}

function query(filterBy, sortBy) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.stat) {
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
            if (sortBy.type === 'date') mails.sort((mail1, mail2) => (mail1.sentAt - mail2.sentAt) * sortBy.dir)
            if (sortBy.type === 'subject') mails.sort((mail1, mail2) => (mail1.subject.localeCompare(mail2.subject)) * sortBy.dir)

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

const criteria = {
    stat: 'inbox/sent/trash/draft',
    txt: 'puki',
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    labels: ['important', 'romantic']
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
    return {
        id: utilService.makeId(),
        subject: utilService.makeLorem(5),
        body: utilService.makeLorem(50),
        isRead: Math.random() < 0.5,
        isStarred: Math.random() < 0.3,
        sentAt: _getRandSentAt(),
        removedAt: _getRandRemovedAt(),
        from: _getRandFrom(),
        to: _getRandTo(),
    }
}

function _getRandSentAt() {
    return Math.random() > 0.2 ? utilService.makeRandTimestamp() : null
}

function _getRandRemovedAt() {
    return Math.random() < 0.3 ? utilService.makeRandTimestamp() : null
}

function _getRandTo() {
    return Math.random() < 0.2 ? utilService.makeRandMail() : loggedInUser.email
}

function _getRandFrom() {
    return Math.random() > 0.2 ? utilService.makeRandMail() : loggedInUser.email
}