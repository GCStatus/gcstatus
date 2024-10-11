export const validations = {
  rate: {
    required: 'Please, make a rate with a number between 1 and 5.',
    min: { value: 0.5, message: 'The minimum value for a review is 0.5.' },
    max: { value: 5, message: 'The maximum value for a review is 5.' },
  },
  played: {
    required: 'Please, tell me if you already played this game.',
  },
  review: {
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
