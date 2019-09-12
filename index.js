const express = require('express');
const app = express();

const courses = [
    {id:1, name: 'Course 1'},
    {id:2, name: 'Course 2'},
    {id:3, name: 'Course 3'},
];

app.get('/', (req, res) => {
    res.send('Hello Node!');
});

/* app.get('/api/courses/', (req, res) => {
    res.send([1, 2, 3]);
}); */

/* Route parameters */
app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send("The course ID not found");
    else
        res.send(course);

});

/* app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
}); */

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});