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
    const [mailSelected, setMailSelected] = useState(null)
    const [mailStarred, setMailStarred] = useState(null)
    const [unreadMails, setUnreadMails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
    const [sortBy, setSortBy] = useState({ type: 'date', dir: -1 })
    const location = useLocation()

    mailService.getUnreadMails()
        .then(unreadMails =>
            setUnreadMails(unreadMails.length))

    useEffect(() => {

        if (location.pathname === '/mail') {
            setMailSelected(null)
            loadMails()
        }
    }, [location])

    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()
    }, [filterBy, sortBy])

    useEffect(() => {
        if (!mailStarred) return
        mailService.update(mailStarred)
        const starredMailIdx = mails.findIndex(mail => mail.id === mailStarred.id)
        mails[starredMailIdx].isStarred = !mails[starredMailIdx].isStarred
        setMails([...mails])
    }, [mailStarred])

    function loadMails() {
        setIsLoading(true)
        mailService.query(filterBy, sortBy)
            .then((mails) => {
                setMails(mails)
                setIsLoading(false)
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

    function onMailStar(mail) {
        setMailStarred({ ...mail, isStarred: !mail.isStarred })
    }

    function onToggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    const { stat, txt } = filterBy
    return <section className="mail-index">
        <div className="main-screen" onClick={onToggleMenu}></div>

        <button className="compose-btn" onClick={onMailEdit}>Compose</button>

        {isMailEdit && <MailEdit
            onCloseMailEdit={onCloseMailEdit}
            isNew={true}
        />}

        <MailFilterTop
            filterBy={{ txt }}
            onSetFilter={onSetFilter}
            onToggleMenu={onToggleMenu} />

        <MailFilterSide
            filterBy={{ stat }}
            onSetFilter={onSetFilter}
            unreadMails={unreadMails} />

        {!mailSelected && <MailList
            mails={mails}
            onMailSelect={onMailSelect}
            sortBy={sortBy}
            onSetSort={onSetSort}
            onMailStar={onMailStar} 
            isLoading={isLoading}
            folder={stat}
            />}

        <Link to={`/mail/${mailSelected}`} />
        {mailSelected && <Outlet />}

    </section>
}