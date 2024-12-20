import { PASSWORD_REQUIREMENTS } from './constants';

export const validatePassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: PASSWORD_REQUIREMENTS.MESSAGES.MISMATCH
    };
  }

  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    return {
      isValid: false,
      error: PASSWORD_REQUIREMENTS.MESSAGES.MIN_LENGTH
    };
  }

  return { isValid: true, error: null };
};