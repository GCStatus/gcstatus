export const updatePasswordValidations = {
  old_password: {
    required: 'Your old password is required to handle a new password.',
    minLength: {
      value: 8,
      message: 'The old password must have at least 8 characters.',
    },
  },
  password: {
    required: 'Your new password is required.',
    minLength: {
      value: 8,
      message: 'The new password must have at least 8 characters.',
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    },
  },
  password_confirmation: {
    required: 'You need to confirm your password.',
    minLength: {
      value: 8,
      message: 'The confirm password must have at least 8 characters.',
    },
  },
}
