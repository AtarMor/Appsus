import { MailPreview } from "./MailPreview.jsx";

export function MailList({ emails }) {
    return <ul className="emails-list clean-list">
        {
            emails.map(email => <li key={email.id}>
                <MailPreview
                    email={email} />
            </li>)
        }
    </ul>
}