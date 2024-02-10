import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {fetchAllCharacters, fetchLocationCharacters} from './apiService';

export const useCharacterQuery = (page: number) => {
  const queryClient = useQueryClient();
  return useInfiniteQuery({
    queryKey: ['character'],
    queryFn: () => fetchAllCharacters(page),
    placeholderData: keepPreviousData,
    initialPageParam : 0,
    getNextPageParam : (lastPage , pages) => {
        return lastPage
    },
  });
};

export const useFetchCharacterData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['character'],
    mutationFn: (lastNumbers : number) => fetchLocationCharacters(lastNumbers),
  });
};
