'use strict'
import express from 'express';
import { getItem, getAll } from './data.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', 'views');
app.set('view engine', 'ejs'); // for templating
app.use('/public', express.static('./public')); // set location for static files
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies

// For the home page, send static file (home.html in public folder) as response
app.get('/', (req,res) => {
    res.render('home', {title: 'IT122', holidays: getAll()});
});
app.get('/details', (req,res) => {
    let key = req.query.key; //getting param from URL
    let holidayItem = getItem(key); //gets the holiday item corresponding to the key
    if (holidayItem === undefined){ // setting a 404 when undefined
        res.type('text/plain'); 
        res.status(404);
        res.send('404 - Not found');
    } else {
        res.render('details', {holidayItem: holidayItem}); // renders details, passing in the holiday item
    }
    
});
  
// For about page, send plain text response
app.get('/about', (req,res) => {
   res.type('text/plain');
   res.send('About page');
});

// Handle the request for a holiday
app.get('/holiday/:holiday', (req, res, next) => {
    // Get the holiday-parameter given
    let holiday = req.params.holiday;
    // Gets the object of this holiday
    let holidayObject = getItem(holiday);
    // If holiday not found, continue to next route (which will give 404)
    if (holidayObject === undefined) return next();
    // Display the colors of the holiday found
    res.send(holidayObject.colors);
})
  
// For everything else, define 404 handler
app.use((req,res) => {
   res.type('text/plain'); 
   res.status(404);
   res.send('404 - Not found');
});

// Start up server, using port we set before (3000)
app.listen(app.get('port'), () => {
    console.log('Express started'); 
});