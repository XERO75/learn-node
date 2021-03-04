const express = require('express');
const app = express();
var morgan = require('morgan');
app.use(express.json());

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

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method);
//   console.log('Path:  ', request.path);
//   console.log('Body:  ', request.body);
//   console.log('---');
//   next();
// };

// app.use(requestLogger);

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' });
// };

// app.use(unknownEndpoint);

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
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post('/api/notes', (request, response) => {
  const note = request.body;
  response.json(note);
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
  res.json(persons);
});

app.get('/info', (req, res) => {
  let length = persons.length;
  res.send(
    `<p>phonebook has info for ${length} ppl </p><br /> <p>${new Date()}</p>`
  );
});

app.get('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  let person = req.body;
  if (!person.name || !person.number) {
    res.status(404).send({ error: 'lack of params' });
    return;
  }
  let isUnique = persons.find((item) => item.name === person.name);
  console.log(isUnique);
  if (isUnique) {
    res.status(404).send({ error: 'name must be unique' });
    return;
  }
  person.id = Math.random() * Math.random() * 10000;
  persons = persons.concat(person);
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
