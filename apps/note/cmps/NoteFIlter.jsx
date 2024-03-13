
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
        <label htmlFor="type-filter">Filter</label>
        <input type="text"
            id="type"
            name="type"
            value={filterByToEdit.txt}
            onChange={handleChange}
            placeholder="By type" />
        {console.log(filterByToEdit)}
    </section>
}