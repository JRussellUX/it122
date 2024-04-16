const holidays = [
    {
        name: 'Christmas',
        season: 'Winter',
        feeling: 'Jolly',
        colors: 'Red, Green'

    },
    {
        name: 'Halloween',
        season: 'Fall',
        feeling: 'Spooky',
        colors: 'Black, Orange'
    },
    {
        name: 'Valentines Day',
        season: 'Winter',
        feeling: 'Romantic',
        colors: 'Pink, Red'
    },
    {
        name: 'Independence Day',
        season: 'Summer',
        feeling: 'Patriotic',
        colors: 'Red, White, Blue'
    },
    {
        name: 'New Years',
        season: 'Winter',
        feeling: 'Festive',
        colors: 'Black, Gold'
    }

];

function getAll() {
    return holidays;
}

function getItem(name) {
    for (let i = 0; i < holidays.length; i++) {
        if (name === holidays[i].name) {
            return holidays[i];
        }

    }

    return undefined;
}

export { getAll, getItem, holidays };

// configuring MongoDB
import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
import { connectionString } from './credentials.js';

mongoose.connect(connectionString, {
    dbName: 'it122'
});

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const holidaySchema = new Schema({
    name: { type: String, required: true },
    season: String,
    feeling: String,
    colors: String,
});

export const Holiday = mongoose.model('Holiday', holidaySchema);




