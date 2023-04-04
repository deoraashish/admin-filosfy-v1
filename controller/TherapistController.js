import multer from 'multer';
import Therapist from '../models/Therapist';
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
    destination: (req, file, cb) => {
        return cb(null, 'static/therapists')
    }
})
const addTherapist = multer({ storage }).single('profileImage');
class TherapistController {
    async therapists(req, res, next) {
        try {
            const therapists = await Therapist.find({});
            return res.render('therapist', { therapists })
        } catch (err) {
            return next(err)
        }
    }
    async addTherapist(req, res, next) {
        addTherapist(req, res, async (err) => {
            if (err) {
                return next(err);
            }
            const { name, qualification, city, fee, experience, age, email, phone, languages } = req.body;
            const profileImage = req.file;
            const lagArray = languages.split(',');
            try {
                const add = await Therapist.create({ name, qualification, city, fee, experience, age, email, phone, languages: lagArray, profileImage: `/therapists/${profileImage.filename}` });
                return res.redirect('back');
            } catch (err) {
                try {
                    fs.unlink(profileImage.path, (err) => {
                    });
                } catch (err) {
                    return next(err);
                }
                return next(err);
            }
        })
    }
    async deleteTherapist(req, res, next) {
        const { id } = req.params;
        try {
            await Therapist.findByIdAndDelete(id);
            return res.redirect('back')
        } catch (err) {
            return next(err)
        }
    }
    async editTherapistPage(req, res, next) {
        const { id } = req.params;
        try {
            const t = await Therapist.findById(id);
            return res.render('therapistEdit', { t })
        } catch (err) {
            return next(err)
        }
    }

    async updateTherapist(req, res, next) {
        addTherapist(req, res, async (err) => {
            if (err) {
                return next(err);
            }
            const { name, qualification, city, fee, experience, age, email, phone, languages,id } = req.body;
            const profileImage = req.file;
            const lagArray = languages.split(',');
            try {
                const update = await Therapist.findByIdAndUpdate(id,{ name, qualification, city, fee, experience, age, email, phone, languages: lagArray, ...(profileImage && { profileImage: `/therapists/${profileImage.filename}` }) });
                if (profileImage) {
                    fs.unlinkSync(`static${update.profileImage}`, (err) => {
                    });
                }
                return res.redirect('/therapists');
            } catch (err) {
                return next(err);
            }
        })
    }
}

export default new TherapistController();