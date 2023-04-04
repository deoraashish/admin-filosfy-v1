import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    therapist: {
        type: Schema.Types.ObjectId,
        ref: 'Therapist'
    },
    answer: {
        type: String
    },
    like: {
        type: Number,
        default:0
    },
    date: {
        type: Date
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "Qusetion"
    }
}, { timestamps: true });

const Answer = mongoose.model('Answer', AnswerSchema, 'Answers');

export default Answer;