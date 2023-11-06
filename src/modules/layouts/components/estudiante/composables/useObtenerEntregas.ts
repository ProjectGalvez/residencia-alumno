import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { EntregaEstudiante } from 'src/modules/model/Model';

const getEntregaEstudiantes = async (): Promise<EntregaEstudiante[]> => {
  const { data } = await documentosApi.get<EntregaEstudiante[]>(
    'estudiante-documentos-entregados'
  );
  return data;
};

const useObtenerEntregas = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['estudiante-documentos-entregados'],
    queryFn: getEntregaEstudiantes,
  });
  return { isLoading, error, data };
};
export default useObtenerEntregas;
