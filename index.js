const express = require("express");
const Joi = require("joi");
const server = express();

server.use(express.json());

const genres = [
  { id: 1, name: "Romance" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Action" }
];

server.post("/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send("The name is invalid");
  const { name } = req.body;
  const genre = {
    id: genres.length + 1,
    name
  };
  genres.push(genre);

  return res.send(genre);
});

server.get("/genres", (req, res) => {
  return res.send(genres);
});

server.get("/genres/:id", (req, res) => {
  const { id } = req.params;
  const genre = genres.find(g => g.id == id);
  res.send(genre);
});

server.put("/genres/:id", (req, res) => {
  const { id } = req.params;
  const { error } = validateGenre(req.body);
  if (error) return res.send("The name is invalid");

  const { name } = req.body;
  const genre = genres.find(g => g.id == id);
  if (!genre) return res.send("The id is not found");

  genre.name = name;
  return res.send(genre);
});

server.delete("/genres/:id", (req, res) => {
  const { id } = req.params;
  const idx = genres.findIndex(g => g.id == id);
  genres.splice(idx, 1);
  return res.send("The movie was deleted");
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}
const port = process.env.port || 3000;
server.listen(port, () => console.log(`Listening the port ${port}`));
