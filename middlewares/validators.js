import Joi from "joi";

const validateSignupData = (req, res, next) => {
    try {
        const { email, phoneNumber } = req.body;

        if (!email && !phoneNumber) {
            throw new Error('Email or phoneNumber is required');
        }

        const validationSchema = email
            ? Joi.string().email().required().label('Email')
            : Joi.string().pattern(/^\+[1-9]\d{1,14}$/).required().label('Phone Number');

        const { error } = validationSchema.validate(email || phoneNumber);
        if (error) {
            throw new Error(`Invalid ${email ? 'email' : 'phone number'} format`);
        }

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default validateSignupData;