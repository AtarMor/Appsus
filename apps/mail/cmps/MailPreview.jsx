import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onMailSelect, onMailStar }) {
  const sentDate = new Date(mail.sentAt)
  const formattedDate = sentDate.getDate() + ' ' + utilService.getMonthName(sentDate).substring(0, 3)

  const readClass = mail.isRead ? 'is-read' : ''

  const starClass = mail.isStarred ? 'solid yellow-star' : 'fa star'

  return <article className={`mail-preview ${readClass}`}>
    <div className={`star ${starClass}`} onClick={() => onMailStar(mail)}></div>
    <div className="mail-content" onClick={() => onMailSelect(mail.id)}>
      <h3 className="mail-from">{mail.from}</h3>
      <h3 className="mail-subject">{mail.subject} - {mail.body}</h3>
      <h3 className="mail-sent-at">{formattedDate}</h3>
    </div>
  </article>
}