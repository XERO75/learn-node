require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const Note = require('./models/note');
const Person = require('./models/person');
app.use(cors());

var morgan = require('morgan');
// const person = require('./models/person');
app.use(express.json());
app.use(express.static('build'));
app.use(
  morgan(function (tokens, req, res) {
    console.log(req.body);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      '-',
      JSON.stringify(req.body),
    ].join(' ');
  })
);

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
  // res.json(notes);
  Note.find({}).then((notes) => {
    console.log('notes', notes);
    res.json(notes);
  });
});

app.get('/api/notes/:id', (req, res) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post('/api/notes', (req, res, next) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    data: new Date(),
  });

  note
    .save()
    .then((saveNote) => saveNote.toJSON())
    .then((saveAndFormattedNote) => {
      res.json(saveAndFormattedNote);
    })
    .catch((error) => next(error));
});

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((err) => next(err));
});

//** exercise 3.1-3.6 */
let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    console.log('persons', persons);
    res.json(persons);
  });
});

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    const length = persons.length;
    res.send(
      `<p>phonebook has info for ${length} ppl </p><br /> <p>${new Date()}</p>`
    );
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
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

  // let person = req.body;
  // if (!person.name || !person.number) {
  //   res.status(404).send({ error: 'lack of params' });
  //   return;
  // }
  // let isUnique = persons.find((item) => item.name === person.name);
  // console.log(isUnique);
  // if (isUnique) {
  //   res.status(404).send({ error: 'name must be unique' });
  //   return;
  // }
  // person.id = Math.random() * Math.random() * 10000;
  // persons = persons.concat(person);
  // res.json(persons);
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatePerson) => {
      res.json(updatePerson);
    })
    .catch((err) => next(err));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
// 这是最后加载的中间件
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
