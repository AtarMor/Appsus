const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM


export function MailFilterSide({ onSetFilter, filterBy, unreadMails }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const folder = searchParams.get('stat')
        if (document.querySelector('.active')) document.querySelector('.active').classList.remove('active')
        if (folder) document.querySelector(`.${folder}.folder`).classList.add('active')
    }, [searchParams])

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleFilter(value) {
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, stat: value }))
        document.body.classList.remove('menu-open')
    }

    return <div className="mail-filter-side">
        <button className="inbox folder" onClick={() => handleFilter('inbox')}>Inbox <span className="unread-count">{unreadMails}</span></button>
        <button className="sent folder" onClick={() => handleFilter('sent')}>Sent</button>
        <button className="draft folder" onClick={() => handleFilter('draft')}>Draft</button>
        <button className="trash folder" onClick={() => handleFilter('trash')}>Trash</button>
    </div>
}