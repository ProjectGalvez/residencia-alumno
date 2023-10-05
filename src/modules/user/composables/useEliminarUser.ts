import useEliminarRecurso from 'src/shared/composables/useEliminarRecurso';

const useEliminarUser = () => {
  return useEliminarRecurso('/users', 'Se eliminó el usuario');
};
export default useEliminarUser;
