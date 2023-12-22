const Note = ({ note, onImportantClick }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content}
      <button onClick={(e) => onImportantClick(e, note.id)}>{label}</button>
    </li>
  )
}

export default Note;