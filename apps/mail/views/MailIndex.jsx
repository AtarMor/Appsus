const { useState, useEffect } = React

import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"


export function MailIndex() {
    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then((mails) => {
                setMails(mails)
            })
    }

    if (!mails) return <div>loading...</div>
    return <section className="email-index">
        <MailList
            emails={mails}
        />
    </section>
}

