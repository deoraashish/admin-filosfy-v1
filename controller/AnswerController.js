import Answer from "../models/Answer";
import Question from "../models/Questions";
import Therapist from "../models/Therapist";

class AnswerController {
    async answers(req, res, next) {
        try {
            const questions = await Question.find({});
            const therapists = await Therapist.find({});
            const answers = await Answer.find({}).populate('question').populate('therapist');
            return res.render('answers', { questions, therapists, answers })
        } catch (err) {
            return next(err)
        }
    }
    async addAnswer(req, res, next) {
        const { question, answer, therapist } = req.body
        try {
            const questions = await Question.findById(question);
            const answeradd = await Answer.create({ answer, question, date: new Date(), therapist });
            questions.answers.push(answeradd._id);
            questions.save();
            return res.redirect('back')
        } catch (err) {
            return next(err)
        }
    }
    async deleteAnswer(req, res, next) {
        const { id } = req.params;
        try {
            await Answer.findByIdAndDelete(id)
            return res.redirect('back');
        } catch (err) {
            return next(err)
        }
    }
    async editAnswerPage(req, res, next) {
        const { id } = req.params;
        try {
            const questions = await Question.find({});
            const therapists = await Therapist.find({});
            const answer = await Answer.findById(id);
            return res.render('editAnswer', { questions, therapists, answer })
        } catch (err) {
            return next(err)
        }
    }
    async updateAnswer (req,res,next) {
        const { question, answer, therapist,id } = req.body
        try {
            const questions = await Question.findById(question);
            const answeradd = await Answer.findByIdAndUpdate(id,{ answer, question, date: new Date(), therapist });
            questions.answers.push(answeradd._id);
            questions.save();
            return res.redirect('/answers')
        } catch (err) {
            return next(err)
        }
    }
}

export default new AnswerController();