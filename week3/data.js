const holidays = [
    {
        key: 'christmas',
        name: 'Christmas',
        season: 'Winter',
        feeling: 'Jolly',
        colors: 'Red, Green'
        
    },
    {
        key: 'halloween',
        name: 'Halloween',
        season: 'Fall',
        feeling: 'Spooky',
        colors: 'Black, Orange'
    },
    {
        key: 'valentines',
        name: 'Valentines Day',
        season: 'Winter',
        feeling: 'Romantic',
        colors: 'Pink, Red'
    },
    {
        key: 'independence',
        name: 'Independence Day',
        season: 'Summer',
        feeling: 'Patriotic',
        colors: 'Red, White, Blue'
    },
    {
        key: 'newyears',
        name: 'New Years',
        season: 'Winter',
        feeling: 'Festive',
        colors: 'Black, Gold'
    }
    
];

function getAll() {
    return holidays;
}

function getItem(key) {
    for (let i=0; i< holidays.length; i++) {
        if(key === holidays[i].key){
            return holidays[i];
        }

    }

    return undefined;
}

export { getAll, getItem };

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
 key: { type: String, required: true },
 name: String,
 season: String,
 feeling: String,
 colors: String,
});

export const Holiday = mongoose.model('Holiday', holidaySchema);




    