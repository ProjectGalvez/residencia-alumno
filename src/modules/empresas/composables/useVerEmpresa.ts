import { Empresa } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerEmpresa = (id: string) => {
  return useRecursoIndividual<Empresa>('/empresas', id, ['empresas', id], {
    staleTime: 1000 * 60 * 60,
  });
};
export default useVerEmpresa;
