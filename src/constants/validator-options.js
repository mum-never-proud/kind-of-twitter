export const signUp = {
  name: [
    [(name) => name, 'Enter your name.'],
  ],
  email: [
    [(email) => email, 'Enter your email.'],
    [(email) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email), 'Enter a valid email address.'],
  ],
  password: [
    [(password) => password && password.length > 8, 'Password must be at least 8 characters.'],
  ],
};

export const signIn = {
  email: [
    [(email) => email, 'Enter your email.'],
  ],
  password: [
    [(password) => password, 'Enter your password.'],
  ],
};

export const forgotPassword = {
  email: [
    [(email) => email, 'Enter your email.'],
  ],
};
