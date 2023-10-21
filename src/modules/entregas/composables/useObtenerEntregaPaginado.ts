import { ref, Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { Entrega } from 'src/modules/model/Model';
import documentosApi from 'src/api/documentosApi';

const fetcher = async (page: Ref<number>): Promise<Entrega[]> => {
  const { data } = await documentosApi.get<Entrega[]>('/entregas', {
    params: {
      page: page.value,
      perPage: 15,
      included: 'estudiante,documento',
    },
  });
  return data;
};
const page = ref(1);

const { isLoading, isError, data, error, isFetching, isPreviousData } =
  useQuery({
    queryKey: ['entregas', page],
    queryFn: () => fetcher(page),
    keepPreviousData: true,
  });
const prevPage = () => {
  page.value = Math.max(page.value - 1, 1);
};
const nextPage = () => {
  if (!isPreviousData.value) {
    page.value = page.value + 1;
  }
};
