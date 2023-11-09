// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create the route for the comments
app.get('/', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post('/', (req, res) => {
    let newComment = req.body;
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            let comments = JSON.parse(data);
            comments.push(newComment);
            fs.writeFile('./comments.json', JSON.stringify(comments), 'utf-8', (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error');
                } else {
                    res.send(newComment);
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});