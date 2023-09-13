import { ref, watch } from 'vue';

import documentosApi from 'src/api/documentosApi';
import { Departamento } from 'src/modules/model/Model';
import { useQuery } from '@tanstack/vue-query';

const getDepartamento = async (id: string) => {
  const { data } = await documentosApi.get<Departamento>(
    '/departamentos/' + id,
    { params: { included: 'carreras' } }
  );
  return data;
};

const useVerDepartamento = (id: string) => {
  const departamento = ref<Departamento>();
  const { data, isLoading } = useQuery(
    ['departamentos', id],
    () => getDepartamento(id),
    {
      staleTime: 1000 * 15,
    }
  );
  watch(
    data,
    () => {
      if (data.value) {
        departamento.value = { ...data.value };
      }
    },
    { immediate: true }
  );
  return { departamento, isLoading };
};

export default useVerDepartamento;
