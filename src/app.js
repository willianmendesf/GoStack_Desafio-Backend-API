const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  res.json(repositories)
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body
  const likes = 0;
  const post = { id:uuid(), title, url, techs, likes }

  repositories.push(post)

  res.json(post)
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params
  const { title, url, techs } = req.body
  const repoIndex = repositories.findIndex(item => item.id === id)
  
  if (repoIndex < 0) res.status(400).json({error:"Project not found"})

  const repo = repositories.find( item => { if (item.id === id) { return item } })
  const { likes } = repo;

  (likes < 0) 
    ? likes = 1 
    : likes + 1

  const put = { id, title, url, techs, likes }

  repositories[repoIndex] = put;
  
  res.json(put);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params
  const repoIndex = repositories.findIndex(item => item.id === id)
  if (repoIndex < 0) { res.status(400).send() } 
  else { 
    repositories.splice(repoIndex, 1) 
    res.status(204).send() 
  }
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params
  const repoIndex = repositories.findIndex(item => item.id === id)

  if (repoIndex < 0) { res.status(400).json({error:"Project not found"}) }
  
  const repo = repositories.find(item => {if (item.id === id) {return item;}})
  const { title, url, techs, likes } = repo
  const put = { id, title, url, techs, likes: likes + 1 }
  
  repositories[repoIndex] = put
  
  res.json(put)
 });

module.exports = app;
