export const mailService = {
    email,
    loggedInUser,
}

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