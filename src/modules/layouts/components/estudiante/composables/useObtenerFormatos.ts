import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Formato } from 'src/modules/model/Model';

const getFormatos = async (): Promise<Formato[]> => {
  const { data } = await documentosApi.get<Formato[]>(
    'estudiante-documentos-entregar'
  );
  return data;
};

const useObtenerFormatos = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['estudiante-documentos-entregar'],
    queryFn: getFormatos,
  });
  return { isLoading, error, data };
};
export default useObtenerFormatos;
