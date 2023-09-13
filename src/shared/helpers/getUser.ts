import { LocalStorage } from 'quasar';
const usuarioString = LocalStorage.getItem('user');
const usuario = JSON.parse(usuarioString + '');

export const getRol = (): string => {
  const roles = usuario.role;
  if (roles.includes('admin')) {
    return 'admin';
  } else if (roles.includes('capturista')) {
    return 'capturista';
  } else if (roles.includes('estudiante')) {
    return 'estudiante';
  } else {
    return 'unknow';
  }
};
