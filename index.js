const express = require('express');
const logger = require('./logger');
const app = express();

app.use(express.json());

app.use(logger);

/* Custom Middleware */
/* app.use((req, res, next) => {
    console.log('Logging...');
    next();
});
app.use((req, res, next) => {
    console.log('Authenticating...');
    next();
}); */

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

/* Use POST method */
app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.name.length < 3){
        //400 - Bad Request
        res.status(400).send('Name is required and should be at least of 3 characters');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
});

/* PUT a course */
app.put('/api/courses:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send("The course ID not found");

    course.name = req.body.name;
    res.send(course);

});

/* DELETE a course */
app.delete('/api/courses:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send("The course ID not found");

    const index = courses.indexOf(course);    
    courses.splice(index, 1);

    res.send(course);

});

/* app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
}); */

/* Query parameter checking */
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
    res.send(req.params);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});