const PersonForm = ({ onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit}>
        <div> name: <input id="name" name="name"/> </div>
        <div> number: <input id="number" name="number"/> </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm;