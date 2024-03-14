const { useState, useEffect } = React

export function NoteSubFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleFilter(value) {
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, check: value }))
    }

    return <section className="side-btns">
        <button onClick={() => handleFilter('archive')}>archive</button>
    </section>
}

