const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { MailEdit } from "../cmps/MailEdit.jsx"

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"


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
                // showSuccessMsg(`Mail removed successfully`)
                navigate('/mail')
            })
            .catch((err) => {
                console.log('Had issues removing mail', err)
                // showErrorMsg(`Could not remove mail`)
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

    const sentDate = new Date(mail.sentAt)
    const formattedDate = sentDate.getDate() + ' ' + utilService.getMonthName(sentDate).substring(0, 3)
    
    return <section className="mail-details">
        <h1 className="mail-subject">{mail.subject}</h1>
        <h2 className="mail-from"><span>From: </span>{mail.from}
        <span className="mail-sent-at">{formattedDate} </span>
        </h2>
        <h2 className="mail-to"><span>To: </span>{mail.to}</h2>
        <h3 className="mail-body">{mail.body}</h3>
        <div className="actions">
            {
                !mail.sentAt && <button onClick={onMailEdit}>Edit</button>
            }
            <button onClick={onRemoveMail}>Delete</button>
            <Link to={`/mail`}><button>Inbox</button></Link>
        </div>

        {isMailEdit && <MailEdit
            onCloseMailEdit={onCloseMailEdit}
        />}
    </section>
}