const nameConflict = (name, persons) => {
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].name === name) {
      return true;
    }
  }
  return false;
}

const clearFields = (e) => {
  e.target.name.value = '';
  e.target.number.value = '';
}

export default { nameConflict, clearFields }