export const validations = {
  rate: {
    required: 'Please, write a number between 0 and 10.',
    min: { value: 0, message: 'The minimum value for a review is 0.' },
    max: { value: 10, message: 'The maximum value for a review is 10.' },
  },
  played: {
    required: 'Please, tell me if you already played this game.',
  },
  comment: {
    minLength: {
      value: 15,
      message: 'Your review must have at least 15 characters.',
    },
    maxLength: {
      value: 2000,
      message: 'Your review can not have more than 2000 characters!',
    },
  },
}
