const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Get all recipes
app.get("/recipes", (req, res) => {
  db.query("SELECT * FROM recipes", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new recipe
app.post("/recipes", (req, res) => {
  const { title, cooking_time, category, difficulty, ingredients, instructions } = req.body;

  const sql = `INSERT INTO recipes 
    (title, cooking_time, category, difficulty, ingredients, instructions) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [title, cooking_time, category, difficulty, ingredients, instructions], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ recipe_id: result.insertId, title, cooking_time, category, difficulty, ingredients, instructions });
  });
});

app.delete("/recipes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM recipes WHERE recipe_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200); // success
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
