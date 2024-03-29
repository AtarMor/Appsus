const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { MailEdit } from "../cmps/MailEdit.jsx"

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function MailDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)
    const [isMailEdit, setIsMailEdit] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => {
                const readMail = { ...mail, isRead: true }
                setMail(readMail)
                mailService.update(readMail)
            })
            .catch(err => {
                console.log('Had issues loading mail', err)
                navigate('/mail')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function onRemoveMail() {
        mailService.remove(mail)
            .then(() => {
                setMail(null)
                showSuccessMsg(`Mail moved to trash`)
                navigate('/mail')
            })
            .catch((err) => {
                console.log('Had issues removing mail', err)
                showErrorMsg(`Could not remove mail`)
            })
    }

    function onMailDelete() {
        mailService.deleteMail(mail.id)
            .then(() => {
                setMail(null)
                showSuccessMsg(`Mail deleted permanently`)
                navigate('/mail')
            })
            .catch((err) => {
                console.log('Had issues deleting mail', err)
                showErrorMsg(`Could not delete mail permanently`)
            })
    }

    function onMailEdit() {
        setIsMailEdit(true)
    }

    function onCloseMailEdit() {
        setIsMailEdit(false)
    }

    if (isLoading) return <React.Fragment></React.Fragment>
    if (!mail) return <div>Mail deleted</div>

    const formattedDate = mail.sentAt ? utilService.getFormattedDate(mail.sentAt) : ''

    return <section className="mail-details">
        <h1 className="mail-subject">{mail.subject}</h1>
        <div className="mail-send-details solid circle-user">
            <h2 className="mail-from"><span >From: </span>{mail.from}
                <span className="mail-sent-at">{formattedDate} </span>
            </h2>
            <h2 className="mail-to"><span>To: </span>{mail.to}</h2>
        </div>
        <h3 className="mail-body">{mail.body}</h3>
        <div className="actions">
            {!mail.sentAt && <button onClick={onMailEdit}>Edit</button>}
            {mail.removedAt && <button onClick={onMailDelete}>Delete permanently</button>}
            {!mail.removedAt && <button onClick={onRemoveMail}>Delete</button>}
            <Link to={`/mail`}><button>Inbox</button></Link>
        </div>

        {isMailEdit && <MailEdit
            onCloseMailEdit={onCloseMailEdit}
        />}
    </section>
}