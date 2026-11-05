const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));

// Demo tasks memory mein store hote hain; server restart par reset honge.
let tasks = [
  { id: 1, title: 'Learn Docker', completed: true },
  { id: 2, title: 'Build CI/CD pipeline', completed: false }
];
let nextId = 3;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'task-manager' });
});

app.get('/api/tasks', (req, res) => res.json(tasks));

app.post('/api/tasks', (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  if (!title) return res.status(400).json({ error: 'title is required' });
  const task = { id: nextId++, title, completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(item => item.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'task not found' });
  if (typeof req.body.completed === 'boolean') task.completed = req.body.completed;
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const before = tasks.length;
  tasks = tasks.filter(item => item.id !== Number(req.params.id));
  if (tasks.length === before) return res.status(404).json({ error: 'task not found' });
  res.status(204).end();
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => console.log(`Task Manager running on port ${PORT}`));
}

module.exports = app;
