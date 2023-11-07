import { useMutation, useQueryClient } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { useRouter } from 'vue-router';

const useAsignarResidencia = (id: string) => {
  const asignar = async (residencia: any): Promise<string> => {
    try {
      const { data } = await documentosApi.patch(
        '/asignar-residencia/' + residencia.estudiante_id,
        residencia,
        {
          params: {
            id: residencia.estudiante_id,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  };
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(asignar, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['estudiantes'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['estudiantes'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['estudiantes-sin-residencia'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['residentes'],
        exact: false,
      });
      router.push({ name: 'listar-residente' });
    },
  });
  return {
    mutate,
    isLoading,
  };
};
export default useAsignarResidencia;
