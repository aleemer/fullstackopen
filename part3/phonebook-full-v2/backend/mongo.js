const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length < 4) {
  // password case
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack:${password}@aleemer.atzxws7.mongodb.net/phonebook-full-v2?retryWrites=true&w=majority`
  mongoose.connect(url)

  // create schema
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', personSchema)

  // find and log information
  Person.find({}).then((result) => {
    console.log('phonebook: ')
    result.forEach((val) => {
      console.log(`${val.name} ${val.number}`)
    })
    mongoose.connection.close();
  })
} else {
  // add person case
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack:${password}@aleemer.atzxws7.mongodb.net/phonebook-full-v2?retryWrites=true&w=majority`
  mongoose.connect(url)

  // create schema
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', personSchema)

  // create person
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number})
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}



// const note = new Note({
//   content: 'HTML is Easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })