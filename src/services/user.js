import Backendless from '@services/backendless';

const { UserService } = Backendless;

export const signIn = ({ email, password }) => UserService.login(email, password, true);

export const signUp = (formData) => UserService.register(formData);

export const restorePassword = ({ email }) => UserService.restorePassword(email);

export const validateSession = () => UserService.getCurrentUser();

export const signOut = () => UserService.logout();
