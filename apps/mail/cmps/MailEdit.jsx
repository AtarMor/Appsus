const { useState } = React
const { useNavigate, useParams } = ReactRouter

import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function MailEdit({ onCloseMailEdit }) {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()

    function onSendMail(ev) {
        ev.preventDefault()

        mailService.save(mailToEdit)
            .then(() => {
                console.log('saved:')
                onCloseMailEdit()
                // showSuccessMsg('Mail sended successfully')
            })
            .catch(err => {
                console.log('Had issues sending mail', err)
                // showErrorMsg('could not send mail')
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setMailToEdit(prevMail => ({ ...prevMail, [field]: value, sentAt: Date.now() }))
    }

    const { to, subject, body } = mailToEdit
    return <section className="mail-edit">
        {/* <h1>{mailToEdit ? mailToEdit.subject : 'New Message'} </h1> */}
        <header>
            <h1>{'New Message'} </h1>
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
                <input
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    onChange={handleChange}
                    value={subject}
                />
            </div>

            <div className="body">
                <input
                    type="text"
                    name="body"
                    onChange={handleChange}
                    value={body}
                />
            </div>

            <button>Send</button>
        </form>
    </section>

}