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

export const updateSocialsValidations = {
  share: {
    required:
      'You must choose if you want to share your socials with another users of the platform or not.',
  },
  phone: {
    pattern: {
      value: /^\+?\d{1,3}\d*$/,
      message:
        'Please, enter a valid phone number, without any symbol or whitespaces.',
    },
    maxLength: {
      value: 15,
      message: 'The phone number must contain less than 15 characters.',
    },
  },
  youtube: {
    pattern: {
      value: /^(https:\/\/)?(www\.)?youtube\.com\/@([^\s]+)$/,
      message:
        'Please, enter a valid YouTube channel URL. The URL should be something like: https://youtube.com/@ChannelName',
    },
  },
  twitch: {
    pattern: {
      value: /^(https:\/\/)?(www\.)?twitch\.tv\/([^\s]+)$/,
      message:
        'Please, enter a valid Twitch channel URL. The URL should be something like: https://twitch.tv/channelname',
    },
  },
  twitter: {
    pattern: {
      value: /^(https:\/\/)?(www\.)?twitter\.com\/([^\s]+)$/,
      message:
        'Please, enter a valid Twitter URL. The URL should be something like: https://twitter.com/username',
    },
  },
  facebook: {
    pattern: {
      value: /^(https:\/\/)?(www\.)?facebook\.com\/([^\s]+)$/,
      message:
        'Please, enter a valid Facebook URL. The URL should be something like: https://facebook.com/username',
    },
  },
  instagram: {
    pattern: {
      value: /^(https:\/\/)?(www\.)?instagram\.com\/([^\s]+)$/,
      message:
        'Please, enter a valid Instagram URL. The URL should be something like: https://instagram.com/username',
    },
  },
}
