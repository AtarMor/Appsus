const { useState, useEffect } = React
const { Link, useSearchParams, Outlet, useLocation } = ReactRouterDOM

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
    const [mailSelected, setMailSelected] = useState(null)

    const location = useLocation()
    useEffect(() => {
        if (location.pathname === '/mail') {
            setMailSelected(null)
        }
    }, [location])

    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
        setMailSelected(null)
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

    function onMailSelect(mailId) {
        setMailSelected(mailId)
    }

    const { stat, txt } = filterBy
    if (!mails) return <div>loading...</div>
    return <section className="mail-index">
        <button className="compose-btn" onClick={onMailEdit}>Compose</button>
        {isMailEdit && <MailEdit
            onCloseMailEdit={onCloseMailEdit}
            isNew={true}
        />}

        <MailFilterTop
            filterBy={{ txt }}
            onSetFilter={onSetFilter} />

        <MailFilterSide
            filterBy={{ stat }}
            onSetFilter={onSetFilter} />

        {!mailSelected && <MailList
            mails={mails}
            onMailSelect={onMailSelect} />}

        <Link to={`/mail/${mailSelected}`} />
        {mailSelected && <Outlet />}

    </section>
}