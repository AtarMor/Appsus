const { useState, useEffect } = React

export function MailFilterTop({ onSetFilter, filterBy, onToggleMenu }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    return <div className="mail-filter-top">
        <button className="toggle-menu-btn" onClick={onToggleMenu}>☰</button>

        <div className="search solid magnifying-glass"> </div>

        <input
            type="text"
            name="txt"
            placeholder="Search mail"
            value={filterByToEdit.txt}
            onChange={handleChange}
        />
    </div>
}