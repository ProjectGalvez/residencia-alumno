import { useMutation, useQueryClient } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const useAsignarResidencia = (id: string) => {
  const asignar = async (residencia: any): Promise<string> => {
    try {
      const { data } = await documentosApi.patch(
        '/asignar-residencia/' + id,
        residencia
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
        queryKey: ['estudiantes', id],
        exact: false,
      });
      router.push({ name: 'ver-estudiante', params: { id } });
    },
  });
  return {
    mutate,
    isLoading,
  };
};
export default useAsignarResidencia;
