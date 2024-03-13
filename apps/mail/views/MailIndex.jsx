const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


import { MailList } from "../cmps/MailList.jsx"
import { MailFilterTop } from "../cmps/MailFilterTop.jsx"
import { MailFilterSide } from "../cmps/MailFilterSide.jsx"
import { MailEdit } from "../cmps/MailEdit.jsx"

import { mailService } from "../services/mail.service.js"


export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState(null)
    const [isMailEdit, setIsMailEdit] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))

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

    function onMailEdit() {
        setIsMailEdit(true)
    }

    function onCloseMailEdit() {
        setIsMailEdit(false)
    }

    const { stat, txt } = filterBy
    if (!mails) return <div>loading...</div>
    return <section className="mail-index">
        <button className="compose-btn" onClick={onMailEdit}>Compose</button>
        {isMailEdit && <MailEdit
            onCloseMailEdit={onCloseMailEdit}
        />}

        <MailFilterTop
            filterBy={{ txt }}
            onSetFilter={onSetFilter} />

        <MailFilterSide
            filterBy={{ stat }}
            onSetFilter={onSetFilter} />

        <MailList
            mails={mails} />
    </section>
}

