import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/citiesApi";

export default function useCities({ page = 1, pageSize = 20 } = {}) {
  return useQuery({
    queryKey: ["cities", page, pageSize],

    queryFn: () =>
      getCities({
        page,
        pageSize,
      }),

    staleTime: 5 * 60 * 1000,
  });
}
