import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Departamento } from 'src/modules/model/Model';

const getEliminados = async (): Promise<Departamento[]> => {
  try {
    const { data } = await documentosApi.get<Departamento[]>(
      '/departamentos-trashed'
    );
    return data;
  } catch (e) {
    throw e;
  }
};

const useEliminadosDepartamento = () => {
  const { data, isLoading, error, isSuccess } = useQuery(
    ['departamentos-trashed'],
    getEliminados,
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  return { departamentosElimnados: data, isLoading, error, isSuccess };
};

export default useEliminadosDepartamento;
