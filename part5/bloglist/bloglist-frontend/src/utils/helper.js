// Helper fn to clear fields in forms
const clearFields = (e, fields) => {
  e.preventDefault()
  for (const field of fields) {
    e.target[field].value = ''
  }
}

export default { clearFields }