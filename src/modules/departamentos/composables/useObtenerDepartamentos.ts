import { Departamento } from 'src/modules/model/Model';
import documentosApi from 'src/api/documentosApi';
import { useQuery } from '@tanstack/vue-query';

const getDepartamentos = async (): Promise<Departamento[]> => {
  const { data } = await documentosApi.get<Departamento[]>('/departamentos');
  return data;
};

const useObtenerDepartamentos = () => {
  const queryDepartamentos = useQuery(['departamentos'], getDepartamentos, {
    staleTime: 1000 * 60 * 60,
  });

  return queryDepartamentos;
};

export default useObtenerDepartamentos;
