import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TherapistSchema = new Schema({
    name: { type: String },
    qualification: { type: String },
    city: { type: String },
    fee: { type: String },
    profileImage: { type: String },
    experience: { type: String },
    age: { type: Number },
    email: { type: String },
    phone: { type: String },
    languages: [{ type: String }]
})

const Therapist = mongoose.model('Therapist', TherapistSchema, 'Therapist');

export default Therapist;