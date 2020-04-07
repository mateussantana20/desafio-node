const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (req, res) => {
  return res.status(200).json(repositories);
});

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body;
  const id = uuid();
  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repositorie);

  return res.status(201).json(repositorie);
});

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params;
  const { title, url, techs, likes } = req.body;

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes,
  };

  const index = repositories.findIndex((repositorie) => repositorie.id === id);

  if (index < 0) {
    return res.status(400).json({ error: 'Repository not found!' });
  }

  repositories[index] = repositorie;

  return res.status(200).json(repositorie);
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;

  const index = repositories.findIndex((repositorie) => repositorie.id === id);

  if (index < 0) {
    return res.status(400).json({ error: 'Repository not found!' });
  }

  repositories.splice(index, 1);

  return res.status(204).send();
});

app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params;

  const repositorie = repositories.find((repositorie) => repositorie.id === id);

  if (!repositorie) {
    return res.status(400).json({ error: 'Repository not found!' });
  }

  repositorie.likes += 1;

  return res.status(200).json(repositorie);
});

module.exports = app;
