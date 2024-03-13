
const { useState, useEffect } = React

export function NoteFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    return <section className="note-filter">
        <label htmlFor="type-filter"></label>
        <input className="input-field" type="search"
            id="type"
            name="type"
            value={filterByToEdit.txt}
            onChange={handleChange}
            placeholder="Search" />
    </section>
}