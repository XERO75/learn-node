const personsRouter = require('express').Router();
const Person = require('../models/person');

// personsRouter.get('/', async (request, response) => {
//   const notes = await Note.find({});
//   response.json(notes.map((note) => note.toJSON()));
// });

personsRouter.get('/', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

personsRouter.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    const length = persons.length;
    res.send(
      `<p>phonebook has info for ${length} ppl </p><br /> <p>${new Date()}</p>`
    );
  });
});

personsRouter.get('/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
});

personsRouter.delete('/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

personsRouter.post('/', (req, res, next) => {
  const body = req.body;
  console.log('body', body);
  if (body.name === undefined) {
    return res.status(400).json({ error: 'name missing!' });
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: 'number missing!' });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savePerson) => {
      res.json(savePerson);
    })
    .catch((err) => {
      next(err);
    });
});




module.exports = personsRouter;
