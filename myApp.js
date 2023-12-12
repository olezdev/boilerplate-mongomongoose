require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var person = new Person({
    name: "olezdev",
    age: 35,
    favoriteFoods: ["pizza", "tofu", "garbanzos"]
  })
  person.save(function (err, data) {
    done(null, data);
  })
};

let arrayOfPeople = [
  { name: "Luffy", age: 19, favoriteFoods: ["Meat"] },
  { name: "Zoro", age: 21, favoriteFoods: ["Sake"] },
  { name: "Nami", age: 20, favoriteFoods: ["oranges"] }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function (err, personToUpdate) {
    if (err) return console.log(err);
    personToUpdate.favoriteFoods.push(foodToAdd);

    personToUpdate.save((err, personUpdated) => {
      if (err) return console.log(err);
      done(null, personUpdated);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, personAgeUpdated) {
    if (err) return console.log(err);
    done(null, personAgeUpdated);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, personRemoved) {
    if (err) return console.log(err);
    done(null, personRemoved);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, personRemoved) {
    if (err) return console.log(err);
    done(null, personRemoved);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
