import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';

interface EstudianteSinResidencia {
  id: string;
  nombre: string;
}
const getEstudiantes = async (): Promise<EstudianteSinResidencia[]> => {
  const { data } = await documentosApi.get<EstudianteSinResidencia[]>(
    '/estudiantes-sin-residencia'
  );
  return data;
};
const useEstudiantesSinResidencia = () => {
  const { isLoading, data } = useQuery(
    ['estudiantes-sin-residencia'],
    getEstudiantes,
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60,
    }
  );
  return { isLoading, data };
};
export default useEstudiantesSinResidencia;
