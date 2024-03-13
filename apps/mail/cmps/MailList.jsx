const { Link, Outlet } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onMailSelect }) {
    return <ul className="mail-list clean-list">
        {
            mails.map(mail => <li onClick={() => onMailSelect(mail.id)} key={mail.id}>
                <Link to={`/mail/${mail.id}`}>
                    <MailPreview mail={mail} />
                </Link>
            </li>)
        }
    </ul>
}