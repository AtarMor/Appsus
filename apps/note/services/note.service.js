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
      backgroundColor: '#e2f6d3'
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
      url: 'https://www.shutterstock.com/image-photo/two-dogs-smile-260nw-684918079.jpg',
      title: 'Bobi and Me'
    },
    style: {
      backgroundColor: '#faafa8'
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
    },
    style: {
      backgroundColor: '#b4ddd3'
    }
  },
  {
    id: 'n104',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'learn react', doneAt: null },
        { txt: 'finish the sprint', doneAt: null },
        { txt: 'eat dinner', doneAt: null },
        { txt: 'walk the dog', doneAt: null },
        { txt: 'cook food for tomorrow', doneAt: null }
      ]
    },
    style: {
      backgroundColor: '#b4ddd3'
    }
  },
  {
    id: 'n105',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#e2f6d3'
    },
    info: {
      txt: 'Remember to hydrate!'
    }
  },
  {
    id: 'n107',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqbWitrQVchxsz7ZISxescTWLQNnKP8ctdhw&usqp=CAU',
      title: 'me when sprint'
    },
    style: {
      backgroundColor: '#faafa8'
    }
  },
  {
    id: 'n108',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      todos: [
        { txt: 'Go to sleep early', doneAt: null },
        { txt: 'Make games', doneAt: null },
      ]
    },
    style: {
      backgroundColor: '#b4ddd3'
    }
  },
]

const NOTE_KEY = 'noteDB'

_createHardCodedNotes(notes)


export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,
  getFilterFromParams,
  renderActionButton,
  createNote,
}

function query(filterBy = getDefaultFilter()) {
  return storageService.query(NOTE_KEY)
    .then(notes => {
      if (filterBy.type) {
        const regex = new RegExp(filterBy.type, 'i')
        notes = notes.filter(note => regex.test(note.type))
      }
      notes.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
      return notes
    })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
    .then(note => _setNextPrevId(note))
}

function remove(note) {
  return storageService.remove(NOTE_KEY, note)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    note = createNote(note.type, note.info)
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote(type = '', info = {}) {
  return {
    id: '',
    createdAt: 0,
    type,
    isPinned: false,
    style: {
      backgroundColor: 'white',
    },
    info: {},
  }
}

//TODO filter stuff
function getDefaultFilter() {
  //TODO add more
  return { type: '' }
}

function getFilterFromParams(searchParams = {}) {
  const defaultFilter = getDefaultFilter()
  return {
    type: searchParams.get('type') || defaultFilter.type,
    //TODO add more
  }
}

//TODO dynamically created notes
function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes.push(createNote('NoteTxt'))
  }

}

//! hardcoded notes
function _createHardCodedNotes(notes) {
  const existingNotes = utilService.loadFromStorage(NOTE_KEY)

  if (!existingNotes || !existingNotes.length) {
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function createNote(type = 'NoteTxt', isPinned, info = { txt: 'Defaultest of notes' }, style) {
  const note = getEmptyNote(type, info)
  note.id = utilService.makeId()
  note.createdAt = Date.now()
  note.isPinned = isPinned
  note.style = style
  note.info = info

  return note
}


// function _setNextPrevId(note) {
//     return storageService.query(NOTE_KEY).then((notes) => {
//         const carIdx = notes.findIndex((currNote) => currNote.id === note.id)
//         const nextNote = notes[carIdx + 1] ? notes[carIdx + 1] : notes[0]
//         const prevNote = notes[carIdx - 1] ? notes[carIdx - 1] : notes[notes.length - 1]
//         note.nextCarId = nextNote.id
//         note.prevCarId = prevNote.id
//         return note
//     })
// }

function renderActionButton(className, onClick, iconClassName, style) {
  return (
    <div className={'hover-circle'}>
      <button className={'btn ' + className} onClick={onClick}>
        <div className={iconClassName} style={style}></div>
      </button>
    </div>
  )
}