// Helper fn to clear fields in forms
const clearFields = (e, fields) => {
  for (field of fields) {
    e.target[field].value = ''
  }
}

export default { clearFields }