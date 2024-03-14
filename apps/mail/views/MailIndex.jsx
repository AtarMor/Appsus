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
    const [sortBy, setSortBy] = useState({type: 'date', dir: -1})
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
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query(filterBy, sortBy)
            .then((mails) => {
                setMails(mails)
            })
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
        setMailSelected(null)
    }

    function onSetSort(type) {
        setSortBy({ type, dir: -sortBy.dir })
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

    function UnreadMailCount() {
        const unreadMails = mails.filter(mail => !mail.isRead)
        return unreadMails.length
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
            onSetFilter={onSetFilter}
            unreadMails={UnreadMailCount} />

        {!mailSelected && <MailList
            mails={mails}
            onMailSelect={onMailSelect}
            sortBy={sortBy}
            onSetSort={onSetSort} />}

        <Link to={`/mail/${mailSelected}`} />
        {mailSelected && <Outlet />}

    </section>
}