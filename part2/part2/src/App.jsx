import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios';


const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const syncData = () => {
    axios
    .get('http://localhost:3001/notes')
    .then(response => {
      setNotes(response.data)
    })
  }

  const sendData = (note) => {
    axios
      .post('http://localhost:3001/notes', note)
      .then(() => syncData());
  }

  useEffect(syncData, [])

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }
    sendData(noteObject);
    setNewNote('a new note...');
  }

  const handleNoteChange = (e) => {
    e.preventDefault();
    setNewNote(e.target.value);
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
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
