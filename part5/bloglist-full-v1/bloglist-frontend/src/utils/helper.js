// Helper fn to set local storage, assumes key is string, val is object
const save = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val))
}

// Helper fn to get local storage, assumes key is string, returns object
const get = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

// Helper fn to clear local storage
const clear = (key) => {
  localStorage.removeItem(key)
}

// Helper fn to clear fields in forms
const resetFields = (e, fields) => {
  e.preventDefault()
  for (const field of fields) {
    e.target[field].value = ''
  }
}

// helper fn that performs callback1, and then callback2 within a timeout
const callWithTimeout = (ms, callback1, callback2) => {
  callback1()
  setTimeout(() => {
    callback2()
  }, ms)
}

export default { save, get, clear, resetFields, callWithTimeout }