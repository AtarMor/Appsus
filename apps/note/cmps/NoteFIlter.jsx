const { useState, useEffect } = React

export function NoteFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { value, name: field } = target
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    return (
        <section className="note-filter">
            <label htmlFor="title-filter"></label>
            <input
                className="input-field"
                type="search"
                id="title-filter"
                name="title"
                value={filterByToEdit.title}
                onChange={handleChange}
                placeholder="Filter by text"
            />
        </section>
    )
}