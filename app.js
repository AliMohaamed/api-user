const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');

app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }))


app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

mongoose.connect("mongodb+srv://ali:nodejs_123@learn-mongodb.o7oyeuw.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((error) => {
    console.log(error);
});

