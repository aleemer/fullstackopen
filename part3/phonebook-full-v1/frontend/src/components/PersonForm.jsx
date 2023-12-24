const PersonForm = ({ onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit}>
        <div> name: <input id="name" name="name" required pattern="[a-zA-Z ]+"/> </div>
        <div> number: <input id="number" name="number" required/> </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm;