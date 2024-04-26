'use strict'
import express from 'express';
import { holidays } from './data.js';
import { Holiday } from './models/Holiday.js';
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', 'views');
app.set('view engine', 'ejs'); // for templating
app.use('/public', express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route
app.use(express.json()); //Used to parse JSON bodies

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

app.get('/api/holidays', (req, res) => {
    Holiday.find({}).lean()
        .then((holidays) => {
            res.json(holidays);
        })
        .catch(err => {
            res.status(500).send('Database Error Occurred: ' + err);
        });
})

app.get('/api/holiday/:name', (req, res) => {
    Holiday.findOne({ name: req.params.name }).lean()
        .then((holiday) => {
            if (holiday === null) {
                res.status(404).send("Holiday " + req.params.name + " not found.");
            } else {
                res.json(holiday);
            }
        })
        .catch(err => {
            res.status(500).send('Database Error Occurred: ' + err);
        });
});

// for deleting an item * extra credit
app.delete('/api/holiday/:name', (req, res, next) => {
    Holiday.deleteOne({ name: req.params.name })
        .then((result) => {
            if (result.deletedCount === 0) {
                res.status(404).send("Holiday " + req.params.name + " not found.");
            } else {
                res.json({
                    success: true,
                    result: result
                });
            }

        })
        .catch(err => {
            res.status(500).send('Database Error Occurred: ' + err);
        });
})

app.post('/api/holiday', (req, res) => {
    if (typeof req.body.name !== "string" || typeof req.body.season !== "string" || typeof req.body.feeling !== "string" || typeof req.body.colors !== "string") {
        res.status(400).send('Invalid Object: ' + JSON.stringify(req.body));
        return;
    }
    let holiday = {
        name: req.body.name,
        season: req.body.season,
        feeling: req.body.feeling,
        colors: req.body.colors
    };
    const options = { upsert: true };
    const updateDoc = {
        $set: holiday
    };
    Holiday.updateOne({ name: req.body.name }, updateDoc, options).lean()
        .then((result) => {
            res.json({
                success: true,
                result: result
            });
        })
        .catch(err => {
            res.status(500).send('Database Error Occurred: ' + err);
        });
});

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
