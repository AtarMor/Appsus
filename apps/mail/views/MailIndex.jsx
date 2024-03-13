const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


import { MailList } from "../cmps/MailList.jsx"
import { MailFilterTop } from "../cmps/MailFilterTop.jsx"
import { MailFilterSide } from "../cmps/MailFilterSide.jsx"

import { mailService } from "../services/mail.service.js"


export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
    // const [filterBy, setFilterBy] = useState({ txt: '', stat: '' })
// console.log('filterBy:', filterBy)

    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadMails() {
        mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)
            })
    }

    const {stat, txt} = filterBy
    if (!mails) return <div>loading...</div>
    return <section className="email-index">
        <MailFilterTop
            filterBy={{txt}}
            onSetFilter={onSetFilter} />

        <MailFilterSide
            filterBy={{stat}}
            onSetFilter={onSetFilter} />

        <MailList
            mails={mails} />
    </section>
}

