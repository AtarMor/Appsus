export function MailPreview({ mail }) {
  return <article className="mail-preview">
    <h3 className="mail-from">{mail.from}</h3>
    <h3 className="mail-subject">{mail.subject}</h3>
    <p className="mail-body">{mail.body}</p>
    <h3 className="mail-sent-at">{mail.sentAt}</h3>
  </article>
}