const { useSearchParams } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, onMailSelect, onMailStar }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const formattedDate = mail.sentAt ? utilService.getFormattedDate(mail.sentAt) : ''

  const readClass = mail.isRead ? 'is-read' : ''
  const starClass = mail.isStarred ? 'solid yellow-star' : 'fa star'

  return <article className={`mail-preview ${readClass}`}>
    <div className={`star ${starClass}`} onClick={() => onMailStar(mail)}></div>
    <div className="mail-content" onClick={() => onMailSelect(mail.id)}>
      <h3 className="mail-from">{['sent', 'draft'].includes(searchParams.get('stat')) ? `To: ${mail.to}` : mail.from}</h3>
      <h3 className="mail-subject">{mail.subject} <span className="mail-body">- {mail.body}</span></h3>
      <h3 className="mail-sent-at">{formattedDate}</h3>
    </div>
  </article>
}