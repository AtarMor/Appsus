const { useState, useEffect } = React

export function MailFilterSide({ onSetFilter, filterBy, unreadMails }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    // console.log('filterByToEdit:', filterByToEdit)
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleFilter(value) {
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, stat: value }))
    }

    return <div className="mail-filter-side">
        <button onClick={() => handleFilter('inbox')}>Inbox {unreadMails()}</button>
        <button onClick={() => handleFilter('sent')}>Sent</button>
        <button onClick={() => handleFilter('draft')}>Draft</button>
        <button onClick={() => handleFilter('trash')}>Trash</button>
    </div>
}