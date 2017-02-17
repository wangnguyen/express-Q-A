const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`connection error: ${err}`);
});

db.once('open', () => {
    console.log('db connection sccessful');
    // all database communication goes here

    // create schema Animal
    const Schema = mongoose.Schema;
    const AnimalSchema = new Schema({
        type:   { type: String, default: 'Goldfish' },
        size:   String,
        color:  { type: String, default: 'yellow' },
        mass:   { type: Number, default: 0.007 },
        name:   { type: String, default: 'Angela' }
    });

    AnimalSchema.pre('save', (next) => {
        if (this.mass >= 100) {
            this.size = 'big';
        } else if (this.mass < 100 && this.mass >= 5) {
            this.size = 'medium';
        } else {
            this.size = 'small';
        }
        next();
    });

    const Animal = mongoose.model('Animal', AnimalSchema); // create model Animal

    // create elephant object
    const elephant = new Animal({
        type: 'elephant',
        color: 'gray',
        mass: 6000,
        name: 'Lawrence'
    });

    const defaultAnimal = new Animal({}); // default: Goldfish

    // create whale object
    const whale = new Animal({
        type: 'whale',
        color: 'blue',
        mass: 19041,
        name: 'Fig'
    });

    // create animal array
    const animalData = [
        {
            type: 'mouse',
            color: 'white',
            mass: 0.12,
            name: 'Mickey'
        },
        {
            type: 'nutria',
            color: 'black',
            mass: 5.5,
            name: 'Gretchen'
        },
        {
            type: 'wolf',
            color: 'gray',
            mass: 20,
            name: 'Iris',
        },
        elephant,
        whale,
        defaultAnimal
    ]; 


    Animal.remove({}, function(err) {
        if (err) console.error(err);
        Animal.create(animalData, (err, results) => {
            if (err) console.err(err)
            Animal.find((err, result) => {
                if (err) console.err(err);
                result.forEach((animal) => {
                    console.log(`${animal.name} is the ${animal.size}-size ${animal.color} ${animal.type}`);
                })
                db.close(() => {
                    console.log('db connection closed');
                });
            })
        })
    })
});