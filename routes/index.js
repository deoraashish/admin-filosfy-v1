import express from 'express';
import LoginController from '../controller/auth/LoginController';
import passport from 'passport';
import HomeController from '../controller/HomeController';
import AuthCheck from '../middlewares/AuthCheck';
import TherapistController from '../controller/TherapistController';
import QuestionController from '../controller/QuestionController';
import AnswerController from '../controller/AnswerController';
const router = express.Router();

// =========== Auth ===========
router.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    return next();
})
router.get('/login', AuthCheck.noLogin, LoginController.login);
router.post('/login', passport.authenticate('local', { failureRedirect: "/login" }), LoginController.loginDetails);

router.use(AuthCheck.loginRequired);

// ========= Home =========
router.get('/', HomeController.home);
router.get('/logout', LoginController.logout)

// =============== therapits =============
router.get('/therapists', TherapistController.therapists)
router.post('/addTherapist', TherapistController.addTherapist)
router.get('/deleteTherapist/:id', TherapistController.deleteTherapist)
router.get('/editTherapist/:id', TherapistController.editTherapistPage)
router.post('/updateTherapist', TherapistController.updateTherapist)

// =============== questions =============
router.get('/questions', QuestionController.questions)
router.post('/addQuestion', QuestionController.addQuestion)
router.post('/updatequestion', QuestionController.updateQuestion)
router.get('/deleteQuestion/:id', QuestionController.deleteQuestion)
router.get('/editquestion/:id', QuestionController.editQuestionPage)

// =============== answers =============
router.get('/answers', AnswerController.answers)
router.post('/addAnswer', AnswerController.addAnswer)
router.get('/deleteAnswer/:id', AnswerController.deleteAnswer)
router.get('/editAnswer/:id', AnswerController.editAnswerPage)
router.post('/editAnswer', AnswerController.updateAnswer)

export default router;