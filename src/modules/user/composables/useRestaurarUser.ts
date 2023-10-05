import useRestaurarRecurso from 'src/shared/composables/useRestaurarRecurso';

const useRestaurarUser = () => {
  return useRestaurarRecurso('/users-restore', 'users', 'users-trashed');
};
export default useRestaurarUser;
