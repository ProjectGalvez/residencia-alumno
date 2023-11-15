import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';

export interface ResidentesPeriodo {
  periodo: string;
  carrera: string;
  cantidad_estudiantes: number;
}

const getCarrerasPeriodo = async (): Promise<ResidentesPeriodo[]> => {
  const { data } = await documentosApi.get<ResidentesPeriodo[]>(
    'residentes-por-periodo'
  );
  return data;
};
const usePeriodosCarrera = () => {
  const { isLoading, data, refetch } = useQuery(
    ['residentes-por-periodo'],
    getCarrerasPeriodo,
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  return {
    isLoading,
    data,
    refetch,
  };
};
export default usePeriodosCarrera;
