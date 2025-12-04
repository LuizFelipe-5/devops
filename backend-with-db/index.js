const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.get('/', (req, res) => res.send('Backend up'));

app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ db: 'ok' });
    } catch (err) {
        res.status(500).json({ db: 'error', error: err.message });
    }
});

app.get('/items', async (req, res) => {
    const { rows } = await pool.query('SELECT id, name FROM items LIMIT 100');
    res.json(rows);
});

app.post('/items', async (req, res) => {
    const { name } = req.body;
    const { rows } = await pool.query('INSERT INTO items(name) VALUES($1) RETURNING id, name', [name]);
    res.status(201).json(rows[0]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
