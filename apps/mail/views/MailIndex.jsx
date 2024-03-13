
export function MailIndex() {
    const [emails, setEmails] = useState(null)

    if (!emails) return <div>loading...</div>
    return <div>mail app</div>
}

