import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
//hardcoded notes
const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]

const NOTE_KEY = 'noteDB'

_createHardCodedNotes(notes)


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
}

//TODO Filter goes here
function query() {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevId(note))
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        note = _createNote(note.type, note.info)
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type = '', info = {}) {
    return {
        id: '',
        createdAt: 0,
        type,
        isPinned: false,
        style: {},
        info,
    }
}


//TODO filter stuff
// function getDefaultFilter() {

// }

// function getFilterFromParams() {

// }

//TODO The real deal
function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote('NoteTxt')) //need more
    }

}

//! TEMPORARY 
function _createHardCodedNotes(notes) {
    const existingNotes = utilService.loadFromStorage(NOTE_KEY)

    if (!existingNotes || !existingNotes.length) {
        utilService.saveToStorage(BOOK_KEY, notes)
    }
}

function _createNote(type = 'NoteTxt', info = { txt: 'Defaultest of notes' }) {
    const note = getEmptyNote(type, info)
    note.id = utilService.makeId()
    note.createdAt = Date.now()

    return note
}

function _setNextPrevId(note) {
    return storageService.query(NOTE_KEY).then((notes) => {
        const carIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[carIdx + 1] ? notes[carIdx + 1] : notes[0]
        const prevNote = notes[carIdx - 1] ? notes[carIdx - 1] : notes[notes.length - 1]
        note.nextCarId = nextNote.id
        note.prevCarId = prevNote.id
        return note
    })
}