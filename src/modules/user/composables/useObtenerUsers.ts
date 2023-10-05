import { User } from 'src/modules/model/Model';
import useRecursosMultiples from 'src/shared/composables/useRecursosMultiples';

const useObtenerUsers = () => {
  return useRecursosMultiples<User[]>(
    '/users',
    ['users'],
    { included: 'roles' },
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useObtenerUsers;
