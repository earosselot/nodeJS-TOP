const { body, check, validationResult } = require('express-validator')

const sanitizeFirstName = body('firstName')
	.trim()
	.isLength({ min: 1 })
	.withMessage('name must have at least one character')
	.isAlpha()
	.withMessage('name must oly contain letters')

const sanitizeLastName = body('lastName', 'last name must have at least one character')
	.trim()
	.isLength({ min: 1 })
	.withMessage('last name must have at least one character')
	.isAlpha()
	.withMessage('last name must oly contain letters')

const sanitizeEmail = body('email', 'should be a valid email').trim().normalizeEmail().isEmail()

const sanitizePassword = body('password')
	.trim()
	.isLength({ min: 6 })
	.withMessage('password must be at least 6 characters')

const checkBothPasswordsMatches = check('passwordConfirmation', 'passwords must be equals')
	.exists()
	.custom((value, { req }) => value === req.body.password)

const errorValidation = (req, res, next) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.render('user/sign-up-form', { errors: validationErrors.errors })
	}
	return next()
}

const userSanitizationsChecksAndValidation = [
	sanitizeFirstName,
	sanitizeLastName,
	sanitizeEmail,
	sanitizePassword,
	checkBothPasswordsMatches,
	errorValidation
]

module.exports = { userSanitizationsChecksAndValidation }
