import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { ResultadoBusqueda } from 'src/modules/model/Model';

const getBusqueda = async (q: string): Promise<ResultadoBusqueda[]> => {
  const { data } = await documentosApi.get<ResultadoBusqueda[]>(
    'buscar-estudiante',
    { params: { q } }
  );
  return data;
};

const useBuscar = (q: string) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['buscar-estudiante'],
    queryFn: () => getBusqueda(q),
  });

  const buscar = (nuevaBusqueda: string) => {
    // Actualizar el término de búsqueda
    q = nuevaBusqueda;
    // Llamar a refetch sin argumentos
    refetch();
  };

  return { isLoading, error, data, buscar };
};
export default useBuscar;
