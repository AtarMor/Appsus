const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React


import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFIlter.jsx"

import { noteService } from "../services/note.service.js"
import { NoteSubFilter } from "../cmps/NoteSubFilter.jsx"


export function NoteIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))
    const [pinnedNotes, setPinnedNotes] = useState(null)

    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
    }, [filterBy, pinnedNotes])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadNotes() {
        noteService.query(filterBy)
            .then((notes) => {
                setNotes(notes)
            })
            .catch((err) => {
                console.log('could not load notes', err)
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
                loadNotes()
                setNotes(prevNotes => prevNotes.map(note => note.id === savedNote.id ? savedNote : note))
                console.log('updated!')
            })
            .catch(err => {
                console.log('could not update', err)
            })
    }

    function onPinNote(noteToUpdate) {
        const updatedNote = {
            ...noteToUpdate,
            isPinned: !noteToUpdate.isPinned,
        }
        console.log(noteToUpdate)
        onUpdateNote(updatedNote)
    }


    console.log('hardcoded notes:', notes)

    const { check, type } = filterBy

    if (!notes) return <div>loading...</div>

    return <section className="note-index">
        <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={{ type }} />

        <NoteSubFilter
            filterBy={{ check }}
            onSetFilter={onSetFilter}
        />

        <div className="btns-container">
            <Link to="/note/edit"><button className='create-btn'>New Note</button></Link>
        </div>

        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onUpdateNote={onUpdateNote}
            onPinNote={onPinNote}
        />
    </section>
}
