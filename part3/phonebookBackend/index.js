const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

app.use(morgan("tiny"));
morgan.token("req-body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = phonebook.find((x) => x.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const currentTime = new Date().toString();
  response.send(`
  
  <p>Phonebook has info for ${phonebook.length} people </p>
  <p>${currentTime}</p>

  `);
});

const generateId = () => {
  return Math.floor(Math.random() * 999999) + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.number) {
    return response.status(400).json({ error: "missing number" }).end();
  } else if (!body.name) {
    return response.status(400).json({ error: "missing name" }).end();
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  if (phonebook.some((person) => person.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" }).end();
  }

  phonebook = phonebook.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {});
