const express = require('express')
const fs = require('fs')
const app = express();
const port = 3000;

app.use('/', express.static('public'));

/*const budget={
    myBudget: [
    {
        title: 'Eat out',
        budget: 25
    },
    {
        title: 'Reni',
        budget: 375
    },
    {
        title: 'Groceries',
        budget: 90

    },
]
}*/

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    fs.readFile('budget-data.json', 'utf8', (err, data) => {
            const budgetData = JSON.parse(data);
            res.json(budgetData);
    });
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});