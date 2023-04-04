import mongoose from 'mongoose';
import { MONGO_URL } from '.';

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"SOmething went wrong in databse connection"));

db.on('open',() => {
    console.log("Database Connected")
})

export default db;