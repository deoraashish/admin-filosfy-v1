import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: 'String',
        required: true
    },
    tags: [{
        type: String,
        required:true
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref:'Answer',
        required: true
    }],
    show : {
        type: Boolean,
        default:false
    }
},{timestamps:true});

const Question = mongoose.model('Qusetion', QuestionSchema, 'Questions');

export default Question;