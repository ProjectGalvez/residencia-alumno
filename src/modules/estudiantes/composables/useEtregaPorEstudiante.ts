import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { DocumentoEstudiante } from 'src/modules/model/Model';

const getEntregas = async (id: string): Promise<DocumentoEstudiante[]> => {
  const { data } = await documentosApi.get<DocumentoEstudiante[]>(
    'entrega-por-residente',
    {
      params: {
        id: id,
      },
    }
  );
  return data;
};

const entregaPorEstudiante = (id: string) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['entrega-por-residente', id],
    queryFn: () => getEntregas(id),
    staleTime: 1000 * 60 * 60,
  });
  return { isLoading, isError, data };
};

export default entregaPorEstudiante;
