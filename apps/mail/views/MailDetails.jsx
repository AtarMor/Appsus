const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function MailDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => { 
                const readMail = {...mail, isRead: true}
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

    if (isLoading) return <div>Loading details..</div>
    if (!mail) return <div>Mail deleted</div>
    return <section className="mail-details">
        <h1>{mail.subject}</h1>
        <h2>{mail.from}</h2>
        <h2>{mail.to}</h2>
        <h3>{mail.sentAt}</h3>
        <div className="actions">
            <button onClick={onRemoveMail}>Delete</button>
            <Link to={`/mail`}><button>Inbox</button></Link>
        </div>
    </section>
}