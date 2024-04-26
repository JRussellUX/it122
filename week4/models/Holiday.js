// configuring MongoDB
import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
import { connectionString } from '../credentials.js';

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