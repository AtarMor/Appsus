const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onMailSelect, sortBy, onSetSort, onMailStar, isLoading, folder }) {
    let fromDir = 'solid caret-down'
    let dateDir = 'solid caret-down'
    let subjectDir = 'solid caret-down'
    let toDir = 'solid caret-down'

    if (sortBy.type === 'from') {
        fromDir = (sortBy.dir === 1) ? 'solid caret-up' : 'solid caret-down'
    }
    else if (sortBy.type === 'date') {
        dateDir = (sortBy.dir === 1) ? 'solid caret-up' : 'solid caret-down'
    }
    else if (sortBy.type === 'subject') {
        subjectDir = (sortBy.dir === 1) ? 'solid caret-up' : 'solid caret-down'
    }
    else if (sortBy.type === 'to') {
        toDir = (sortBy.dir === 1) ? 'solid caret-up' : 'solid caret-down'
    }

    function emptyFolderMsg() {
        if (folder === 'inbox' || folder === 'trash') return `No mails in ${folder}.`
        else return `No ${folder} mails.`
    }

    return <ul className="mail-list clean-list">
        <li className="sort-list">
            <button className={fromDir} onClick={() => onSetSort('from')}>From</button>
            <button className={dateDir} onClick={() => onSetSort('date')}>Date</button>
            <button className={subjectDir} onClick={() => onSetSort('subject')}>Subject</button>
            <button className={toDir} onClick={() => onSetSort('to')}>To</button>
        </li>
        {
            isLoading ? <span class="loader"></span> :
            (!mails || !mails.length ? (<p className="empty-folder-msg">{emptyFolderMsg()}</p>): mails.map(mail => <li key={mail.id}>
                <Link to={`/mail/${mail.id}`}>
                    <MailPreview
                        mail={mail}
                        onMailSelect={onMailSelect}
                        onMailStar={onMailStar} />
                </Link>
            </li>))
        }
    </ul>
}