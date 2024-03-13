const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React


import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFIlter.jsx"

import { noteService } from "../services/note.service.js"


export function NoteIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadNotes() {
        noteService.query(filterBy)
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                console.log('note removed!') //TODO replace with message
            })
            .catch((err) => {
                console.log('could not remove note', err) //TODO replace with message
            })
    }

    function onUpdateNote(noteToUpdate) {
        noteService.save(noteToUpdate)
            .then((savedNote) => {
                setNotes(prevNotes => prevNotes.map(note => note.id === savedNote.id ? savedNote : note))
                console.log('updated!')
            })
            .catch(err => {
                console.log('could not update', err)
            })
    }


    console.log('hardcoded notes:', notes)

    const { type } = filterBy
    if (!notes) return <div>loading...</div>

    return <section className="note-index">
        <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={{ type }} />
        <div className="btns-container">
            <Link to="/note/edit"><button className='create-btn'>New Note</button></Link>
        </div>
        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onUpdateNote={onUpdateNote}
        />
    </section>
}
