const { useState, useEffect, useRef } = React
const { useParams } = ReactRouter

import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export function MailEdit({ onCloseMailEdit, isNew = false }) {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const { mailId } = useParams()
    const timeoutRef = useRef(null)
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        if (isNew) mailService.save(mailToEdit)
            .then(newMail => {
                setMailToEdit(newMail)
            })
            .catch(err => {
                console.log('Had issues saving new mail', err)
            })
    }, [])

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            if (mailToEdit.id) mailService.save(mailToEdit)
            setTimer(timer + 1)
        }, 5000)
        return () => {
            clearTimeout(timeoutRef)
            timeoutRef.current = null
        }
    }, [timer])

    useEffect(() => {
        if (mailId && !isNew) loadMail()
    }, [])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMailToEdit(mail))
            .catch(err => {
                console.log('Had issues loading mail', err)
            })
    }

    function onSendMail(ev) {
        ev.preventDefault()

        mailService.save({ ...mailToEdit, sentAt: Date.now() })
            .then(() => {
                onCloseMailEdit()
                showSuccessMsg('Mail sended successfully')
            })
            .catch(err => {
                console.log('Had issues sending mail', err)
                showErrorMsg('Could not send mail')
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }

    const { to, subject, body } = mailToEdit
    return <section className="mail-edit">
        <header>
            <h1>{isNew ? 'New Message' : mailToEdit.subject} </h1>
            <button onClick={() => onCloseMailEdit()}>x</button>
        </header>

        <form onSubmit={onSendMail} >
            <div className="email">
                <input
                    type="email"
                    placeholder="To"
                    name="to"
                    onChange={handleChange}
                    value={to}
                />
            </div>

            <div className="subject">
                <textarea
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    onChange={handleChange}
                    value={subject}
                />
            </div>

            <div className="body">
                <textarea
                    type="text"
                    placeholder="Compose mail"
                    name="body"
                    onChange={handleChange}
                    value={body}
                />
            </div>

            <button className="send-btn">Send</button>
        </form>
    </section>
}