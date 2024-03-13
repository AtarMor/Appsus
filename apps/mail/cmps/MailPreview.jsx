export function MailPreview({ email }) {
  return <article className="mail-preview">
    <h3 className="mail-from">{email.from}</h3>
    <h3 className="mail-subject">{email.subject}</h3>
    <p className="mail-body">{email.body}</p>
    <h3 className="mail-sent-at">{email.sentAt}</h3>
  </article>
}