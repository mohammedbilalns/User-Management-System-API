export const creteUserValidationSchema = {
    username: {
        isLength: {
            options: {
                min:5,
                max:32
            },
            errorMessage: 'username must be between 5-32 chars'
        },
        notEmpty: {
            errorMessage: `username cannot be empty`
        },
        isString: {
            errorMessage: `username must be a string`
        },
    },
    displayName:  {
        notEmpty: true
    }
}