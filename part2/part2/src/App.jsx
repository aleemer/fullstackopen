import Note from './components/Note'

const App = ({ notes }) => {

  return (
    <div>
      <h1>Notes</h1>
      {notes.map(note =>
        <Note key={note.id} note={note}/> 
      )}
    </div>
  )
}

export default App
