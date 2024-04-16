'use strict'
import express from 'express';
import { holidays } from './data.js';
import { Holiday } from './models/Holiday.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', 'views');
app.set('view engine', 'ejs'); // for templating
app.use('/public', express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// For the home page, send static file (home.html in public folder) as response
app.get('/', (req, res, next) => {
    Holiday.find({}).lean()
        .then((holidays) => {
            // respond to browser only after db query completes
            res.render('home', { title: 'IT122', holidays: holidays });
        })
        .catch(err => next(err))
});


app.get('/details', (req, res, next) => {
    // db query can use request parameters
    Holiday.findOne({ name: req.query.name }).lean()
        .then((holidayItem) => {
            if (holidayItem === null) {
                res.type('text/plain');
                res.send('Item not found');
            } else {
                res.render('details', { holidayItem: holidayItem });
            }

        })
        .catch(err => res.json({ "error": err }));
});


// For about page, send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
});

// for deleting an item * extra credit
app.get('/delete', (req, res, next) => {
    Holiday.deleteOne({ name: req.query.name }).then((result) => {
        if (result.deletedCount === 0) {
            res.type('text/plain');
            res.send('Item not found');
        } else {
            res.type('text/plain');
            res.send('Item ' + req.query.name + ' has successfully been deleted');
        }
    })
        .catch(err => res.json({ "error": err }));
})

// for resetting the database to the inital values
app.get('/resetdb', (req, res, next) => {
    Holiday.deleteMany({}).then((result) => {
        console.log(result);
        Holiday.insertMany(holidays).then((result) => {
            console.log(result);
            res.type('text/plain');
            res.send('Database has been reset');
        })
            .catch(err => res.json({ "error": err }));
    })
        .catch(err => res.json({ "error": err }));
})


// For everything else, define 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// Start up server, using port we set before (3000)
app.listen(app.get('port'), () => {
    console.log('Express started');
});
