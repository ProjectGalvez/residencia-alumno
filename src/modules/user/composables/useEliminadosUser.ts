import { User } from 'src/modules/model/Model';
import useRecursosEliminados from 'src/shared/composables/useRecursosEliminados';

const useEliminadosUser = () => {
  return useRecursosEliminados<User[]>(
    'users-trashed',
    ['users-trashed'],
    {
      included: 'roles',
    },
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useEliminadosUser;
