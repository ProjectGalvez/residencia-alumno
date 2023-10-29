import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { DocumentoPendiente } from 'src/modules/model/Model';

const getEntregas = async (id: string): Promise<DocumentoPendiente[]> => {
  const { data } = await documentosApi.get<DocumentoPendiente[]>(
    'documentos-pendientes',
    {
      params: {
        id: id,
      },
    }
  );
  return data;
};

const useObtenerPendientesEstudiante = (id: string) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['documentos-pendientes'],
    queryFn: () => getEntregas(id),
  });
  return { isLoading, isError, data };
};

export default useObtenerPendientesEstudiante;
