import { User } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerUser = (id: string) => {
  return useRecursoIndividual<User>(
    '/users',
    id,
    ['users', id],
    {
      staleTime: 1000 * 60 * 60,
    },
    { included: 'roles' }
  );
};
export default useVerUser;
