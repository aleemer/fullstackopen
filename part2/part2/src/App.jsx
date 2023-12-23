import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes';


const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');

  const clearErrorMessage = (timeout) => {
    setTimeout(() => {
      setErrorMessage(null);
    }, timeout)
  }

  const syncData = () => {
    noteService.getAll()
      .then(initialNotes => setNotes(initialNotes))
      .catch((error) => console.log('error in sync ', error));
  }

  useEffect(syncData, [])

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }
    noteService
      .create(noteObject)
      .then(() => {
        syncData();
        setNewNote('a new note...');
      })
      .catch((error) => console.log('error in create ', error));
  }

  const handleNoteChange = (e) => {
    e.preventDefault();
    setNewNote(e.target.value);
  }

  const handleImportantClick = (e, id) => {
    e.preventDefault();
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(() => syncData())
      .catch((error) => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        clearErrorMessage(5000)
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} onImportantClick={handleImportantClick} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App 
