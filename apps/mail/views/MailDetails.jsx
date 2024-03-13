const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    const [isLoading, setIsLoading] = useState(true)
	const [mail, setMail] = useState(null)
	const params = useParams()
	const navigate = useNavigate()

    useEffect(() => {
		loadMail()
	}, [params.mailId])

	function loadMail() {
		setIsLoading(true)
		mailService.get(params.mailId)
			.then(mail => setMail(mail))
			.catch(err => {
				console.log('Had issues loading mail', err)
				navigate('/mail')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	if (isLoading) return <div>Loading details..</div>
    return <section className="mail-details">
        <h1>{mail.subject}</h1>
        <h2>{mail.from}</h2>
        <h2>{mail.to}</h2>
        <h3>{mail.sentAt}</h3>
        <div className="actions">
            <button>Delete</button>
            <Link to={`/mail`}><button>Inbox</button></Link>
        </div>
    </section>
}