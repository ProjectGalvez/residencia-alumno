import useForzarEliminaciónRecurso from 'src/shared/composables/useForzarEliminaciónRecurso';

const useForzarEliminacionUser = () => {
  return useForzarEliminaciónRecurso('users-force-delete', 'users-trashed');
};
export default useForzarEliminacionUser;
