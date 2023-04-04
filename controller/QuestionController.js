import Question from "../models/Questions";

class QuestionController {
    async questions(req, res, next) {
        try {
            const questions = await Question.find({});
            return res.render('questions', { questions });
        } catch (err) {
            return next(err)
        }
    }
    async addQuestion(req, res, next) {
        const { question, tags } = req.body;
        const tagsArray = await tags.split(',')
        try {
            await Question.create({ question, tags: tagsArray })
            return res.redirect('back')
        } catch (err) {
            return next(err)
        }
    }
    async updateQuestion(req, res, next) {
        const { question, tags, id } = req.body;
        const tagsArray = await tags.split(',')
        try {
            await Question.findByIdAndUpdateid,({ question, tags: tagsArray })
            return res.redirect('/questions')
        } catch (err) {
            return next(err)
        }
    }
    async deleteQuestion(req, res, next) {
        const { id } = req.params;
        try {
            await Question.findByIdAndDelete(id)
            return res.redirect('back')
        } catch (err) {
            return next(err)
        }
    }
    async editQuestionPage(req, res, next) {
        const { id } = req.params;
        try {
            const question = await Question.findById(id);
            return res.render('questionsEdit', { question });
        } catch (err) {
            return next(err)
        }
    }
}

export default new QuestionController();