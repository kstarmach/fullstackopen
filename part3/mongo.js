const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide every required argument: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://starmil:${password}@cluster0.exzlqd2.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    mongoose
        .connect(url)
        .then(() => {
            console.log('connected')

            Person
                .find({})
                .then(persons => {
                    console.log('phonebook:')
                    persons.map(person => console.log(`${person.name} ${person.number}`))
                    return mongoose.connection.close()
                })

        })
        .catch((err) => console.log(err))
}

if (process.argv.length === 5) {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    mongoose
        .connect(url)
        .then(() => {
            console.log('connected')


            return person.save()
        })
        .then(() => {
            console.log(`added ${person.name} ${person.number} to phonebook`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}

