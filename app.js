const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const photoRoutes = require('./routes/photoRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();

//* Database Connection
mongoose.connect('mongodb+srv://fatihkonuk000:jsVYV1YK9BDtEPM6@cluster0.uiqzert.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((result) => {
    console.log('DB Connected');
}).catch((err) => {
    console.log(err);
});;

//* Template Engine
app.set('view engine', 'ejs');

//* MiddleWares
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods:['POST','GET']
}));

//* Routes
app.use(photoRoutes);
app.use(pageRoutes);


const port = process.env.Port || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})