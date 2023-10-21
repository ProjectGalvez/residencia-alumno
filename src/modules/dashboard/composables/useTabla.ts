import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Tabla } from 'src/modules/model/Model';

const getNumeroResidentes = async (): Promise<Tabla> => {
  const { data } = await documentosApi.get<Tabla>('tabla');
  return data;
};

const useTabla = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['tabla'],
    queryFn: getNumeroResidentes,
  });
  return { isLoading, isError, data, error };
};
export default useTabla;
