const express = require('express');
const fs = require('fs');
const cors = require('cors');  // You'll need to install this: npm install cors
const app = express();
const port = 3000;  // Changed to 5000

app.use(cors());  // This allows your React app to make requests to this server
app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    fs.readFile('budget-data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading budget data');
            return;
        }
        const budgetData = JSON.parse(data);
        res.json(budgetData);
    });
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});