const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onMailSelect,sortBy, onSetSort }) {
let dateArrow =  "assets/img/down-arrow.svg"
let subjectArrow = "assets/img/down-arrow.svg"

    if (sortBy.type === 'date') {
         dateArrow = (sortBy.dir === 1) ? "assets/img/up-arrow.svg" : "assets/img/down-arrow.svg"
    }
    else if (sortBy.type === 'subject') {
        subjectArrow = (sortBy.dir === 1) ? "assets/img/up-arrow.svg" : "assets/img/down-arrow.svg"
    }

    return <ul className="mail-list clean-list">
        <li className="sort-list">
            <button onClick={() => onSetSort('date')}>
                <img className="arrow" src={dateArrow} alt="arrow"/>
                <h5>Date</h5>
                </button>
            <button onClick={() => onSetSort('subject')}>
                <img className="arrow" src={subjectArrow} alt="arrow"/>
                <h5>Subject</h5>
                </button>
        </li>
        {
            mails.map(mail => <li key={mail.id}>
                <Link to={`/mail/${mail.id}`}>
                    <MailPreview
                        mail={mail}
                        onMailSelect={onMailSelect} />
                </Link>
            </li>)
        }
    </ul>
}